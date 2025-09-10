import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { Account } from "./entities/account.entity";
import { BaseService } from "../../common/service/base.service";
import { InjectRepository } from "@nestjs/typeorm";
import { OrderType } from "src/common/enums/order.enums";
import { v4 as uuidv4 } from 'uuid';
import { RedisService } from "src/common/service/redis.service";
import { Position } from "../position/entities/position.entity";
import { Order } from "../order/entities/order.entity";

@Injectable()
export class AccountService extends BaseService<Account> {
    constructor(
        @InjectRepository(Account)
        private readonly accountRepository: Repository<Account>,
        @InjectRepository(Position)
        private readonly positionRepository: Repository<Position>,
        private readonly redisService: RedisService
    ) {
        super(accountRepository);
    }

    /**
     * Frozen amount and balance
     * @param accountId 
     * @param orderType 
     * @param amount 
     * @param quantity 
     * @returns 
     */
    async frozenAmountAndBalance(accountId: number, frozenAmount: number): Promise<boolean> {
        // update account
        const account = await this.accountRepository.findOne({ where: { id: accountId } });
        if(!account) {
            throw new Error('Account not found');
        }
        if(frozenAmount > account.balance) {
            throw new Error('Insufficient balance');
        }
        // if buy, just frozen amount, else frozen quantity
        account.frozen -= frozenAmount;
        account.balance += frozenAmount;
        await this.accountRepository.update(accountId, {frozen: account.frozen, balance: account.balance});
        return true;
    }

    /**
     * Transfer amount and quantity
     * @param buyOrder 
     * @param sellOrder 
     * @param tradePrice 
     * @param sellPtradeQualityrice 
     * @returns 
     */
    async transferAmountAndQuantity(buyOrder: Order, sellOrder: Order, tradePrice: number, tradeQuality: number): Promise<boolean> {
        const buyLock = `account:lock:${buyOrder.accountId}`;
        const sellLock = `account:lock:${sellOrder.accountId}`;
        const buyLockValue = uuidv4();
        const sellLockValue = uuidv4();
        const buyLockResult = await this.redisService.setnx(buyLock, buyLockValue, 10);
        const sellLockResult = await this.redisService.setnx(sellLock, sellLockValue, 10);
        if(!buyLockResult || !sellLockResult) {
            throw new Error('Lock acquisition failed');
        }
        try {
            const buyAccount = await this.accountRepository.findOne({ where: { id: buyOrder.accountId } });
            const sellAccount = await this.accountRepository.findOne({ where: { id: sellOrder.accountId } });
            if(!buyAccount || !sellAccount) {
                throw new Error('Account not found');
            }
            const result = await this.handleAccountBalance(buyAccount, sellAccount, tradePrice, tradeQuality, sellOrder.symbol);
            if(!result) {
                throw new Error('Failed to transfer amount and quantity');
            }
            return true;
        } catch (error) {
            throw error;
        } finally {
            await this.redisService.releaseLock(buyLock, buyLockValue);
            await this.redisService.releaseLock(sellLock, sellLockValue);
        }

    }

    /**
     * Handle account balance
     * @param buyAccount 
     * @param sellAccount 
     * @param tradePrice 
     * @param tradeQuality 
     * @param symbol 
     * @returns 
     */
    async handleAccountBalance(buyAccount: Account, sellAccount: Account, tradePrice: number, tradeQuality: number, symbol: number): Promise<boolean> {
        // update buyer and seller position
        sellAccount.balance += tradePrice * tradeQuality;
        // get position
        const sellerPosition = await this.positionRepository.findOne({ where: { accountId: sellAccount.id, symbol } });
        if(!sellerPosition) {
            throw new Error('Sell Acount does not have this symbol');
        }
        if(sellerPosition.frozenQuantity < tradeQuality) {
            throw new Error('Insufficient frozen quantity');
        }
        sellerPosition.frozenQuantity -= tradeQuality;
        await this.positionRepository.update(sellerPosition.id, { frozenQuantity: sellerPosition.frozenQuantity });
        // get buyer position
        const buyerPosition = await this.positionRepository.findOne({ where: { accountId: buyAccount.id, symbol } });
        if(!buyerPosition) {
            await this.positionRepository.create({
                accountId: buyAccount.id,
                symbol,
                quantity: tradeQuality,
                frozenQuantity: 0,
            });
        } else {
            buyerPosition.quantity += tradeQuality;
            await this.positionRepository.update(buyerPosition.id, { quantity: buyerPosition.quantity });
        }
        
        // update buyer and seller account
        if(buyAccount.frozen < tradePrice * tradeQuality) {
            throw new Error('Insufficient frozen amount');
        }
        buyAccount.frozen -= tradePrice * tradeQuality;
        sellAccount.balance += tradePrice * tradeQuality;
        await this.accountRepository.update(buyAccount.id, { frozen: buyAccount.frozen });
        await this.accountRepository.update(sellAccount.id, { balance: sellAccount.balance });
        return true;
    }
}