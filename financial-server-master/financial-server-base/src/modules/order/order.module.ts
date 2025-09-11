import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { Order } from './entities/order.entity';
import { RedisModule } from '../../common/module/redis.module';
import { AccountModule } from '../account/account.module';
import { PositionModule } from '../position/position.module';
import { TradeModule } from '../trade/trade.module';
import { SymbolModule } from '../symbol/symbol.module';

@Module({
  imports: [TypeOrmModule.forFeature([Order]), RedisModule, AccountModule, PositionModule, TradeModule, SymbolModule],
  controllers: [OrderController],
  providers: [OrderService],
  exports: [OrderService],
})
export class OrderModule {} 