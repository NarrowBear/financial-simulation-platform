import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "./entities/user.entity";
import { BaseService } from "../../common/service/base.service";
import { AccountService } from "../account/account.service";
import { RedisService } from "src/common/service/redis.service";
import { RedisKey } from "src/common/enums/redis.enums";
import { PositionService } from "../position/position.service";

@Injectable()
export class UserService extends BaseService<User> {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private readonly accountService: AccountService,
        private readonly redisService: RedisService,
        private readonly positionService: PositionService
        
    ) {
        super(userRepository);
    }

    async getPortfolio(user: any): Promise<any> {
        const portfolio = await this.redisService.get(RedisKey.USER_PORTFOLIO.replace('{userUin}', user.userUin));
        if(portfolio) {
            return JSON.parse(portfolio);
        }
        const userInfo = await this.userRepository.findOne({ where: { userUin: user.userUin } });
        if(!userInfo) {
            throw new NotFoundException('User not found');
        }
        const accounts = await this.accountService.findBy({ userId: userInfo.id });
        accounts.forEach(account => {
            const {accountNo, balance, currency, frozen} = account;

        })
        
    }
}
