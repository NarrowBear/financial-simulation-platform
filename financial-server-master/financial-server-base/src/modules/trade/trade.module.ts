import { Module } from '@nestjs/common';
import { TradeRecord } from "./entities/trade-record.entity"
import { TradeService } from "./trade.service"
import { TypeOrmModule } from "@nestjs/typeorm"
import { RedisModule } from "../../common/module/redis.module"
import { AccountModule } from "../account/account.module"
import { OrderModule } from "../order/order.module"
import { PositionModule } from "../position/position.module"

@Module({
    imports: [TypeOrmModule.forFeature([TradeRecord]), RedisModule, AccountModule, OrderModule, PositionModule],
    providers: [TradeService],
    exports: [TradeService],
})
export class TradeModule {}