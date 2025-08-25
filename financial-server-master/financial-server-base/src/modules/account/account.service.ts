import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { Account } from "./entities/account.entity";
import { BaseService } from "../../common/service/base.service";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class AccountService extends BaseService<Account> {
    constructor(
        @InjectRepository(Account)
        private readonly accountRepository: Repository<Account>
    ) {
        super(accountRepository);
    }
}