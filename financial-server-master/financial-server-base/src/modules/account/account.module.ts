import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from './entities/account.entity';
import { AccountService } from './account.service';
import { AccountController } from './account.controller';
import { RedisModule } from 'src/common/module/redis.module';
import { PositionModule } from '../position/position.module';

@Module({
    imports: [TypeOrmModule.forFeature([Account]), RedisModule, PositionModule],
    controllers: [AccountController],
    providers: [AccountService],
    exports: [AccountService],
})
export class AccountModule {}