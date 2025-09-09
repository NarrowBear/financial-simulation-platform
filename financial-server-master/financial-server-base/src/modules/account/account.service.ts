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
     * @param buyPrice 
     * @param sellPrice 
     * @returns 
     */
    async transferAmountAndQuantity(buyOrder: Order, sellOrder: Order, buyPrice: number, sellQuantity: number): Promise<boolean> {
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
            buyAccount.balance += buyPrice * sellQuantity;
        }

    }
}