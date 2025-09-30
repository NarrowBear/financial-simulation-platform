import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { AccountService } from "../account/account.service";
import { RedisService } from "src/common/service/redis.service";
import { AccountModule } from "../account/account.module";
import { RedisModule } from "src/common/module/redis.module";

@Module({
    imports: [TypeOrmModule.forFeature([User]), AccountModule, RedisModule],
    controllers: [UserController],
    providers: [UserService, AccountService, RedisService],
    exports: [UserService],
})
export class UserModule {}