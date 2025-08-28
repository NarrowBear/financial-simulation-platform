import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { Account } from "./entities/account.entity";
import { BaseService } from "../../common/service/base.service";
import { InjectRepository } from "@nestjs/typeorm";
import { OrderType } from "src/common/enums/order.enums";
import { v4 as uuidv4 } from 'uuid';
import { RedisService } from "src/common/service/redis.service";
import { Position } from "../position/entities/position.entity";

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
}