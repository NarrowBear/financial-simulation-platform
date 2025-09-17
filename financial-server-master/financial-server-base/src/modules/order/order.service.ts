import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { OrderOperation, OrderStatus, OrderType } from '../../common/enums/order.enums';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { BaseService } from '../../common/service/base.service';
import { AccountService } from '../account/account.service';
import { PositionService } from '../position/position.service';
import { v4 as uuidv4 } from 'uuid';
import { RedisService } from '../../common/service/redis.service';
import { TradeService } from '../trade/trade.service';
import { SymbolService } from '../symbol/symbol.service';

@Injectable()
export class OrderService extends BaseService<Order> {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
    private accountService: AccountService,
    private positionService: PositionService,
    private tradeService: TradeService,
    private symbolService: SymbolService,
    private redisService: RedisService,
  ) {
    super(orderRepository);
  }

  /**
   * Create order
   * @param createOrderDto 
   * @returns 
   */
  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    if (createOrderDto.orderType === OrderType.LIMIT && !createOrderDto.price) {
      throw new BadRequestException('Limit orders must provide a price');
    }
    if (createOrderDto.orderType === OrderType.MARKET && createOrderDto.price) {
      throw new BadRequestException('Market orders cannot provide a price');
    }
    // lock account
    const lockKey = `account:lock:${createOrderDto.accountNo}`;
    const lockValue = uuidv4();
    const lockResult = await this.redisService.setnx(lockKey, lockValue, 10);
    if(!lockResult) {
      throw new BadRequestException('Lock acquisition failed');
    }
    const queryRunner = this.orderRepository.manager.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const account = await this.accountService.findOne({accountNo: createOrderDto.accountNo});
      if(!account) {
        throw new BadRequestException('Account not found');
      }
      let unitPrice = 0;
      if(createOrderDto.orderType === OrderType.LIMIT) {
        if(!createOrderDto.price) {
          throw new BadRequestException('Limit orders must provide a price');
        }
        unitPrice = createOrderDto.price;
      }
      if(createOrderDto.orderType === OrderType.MARKET) {
        unitPrice = await this.getEstimatedPrice(createOrderDto.symbol);
      }
      if(createOrderDto.operation === OrderOperation.BUY) {
        // frozen amount
        await this.accountService.frozenAmountAndBalance(account.id, createOrderDto.quantity * unitPrice);
      } else {
        // frozen quantity
        await this.positionService.frozenSymbolQuantity(account.id, createOrderDto.symbol, createOrderDto.quantity);
      }
      const order = this.orderRepository.create({
        ...createOrderDto,
        dealQuantity: 0,
        status: OrderStatus.PENDING,
      });
      await queryRunner.manager.save(Order, order);
      await queryRunner.commitTransaction();
      return order;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
      await this.redisService.del(lockKey);
      // after create order, trigger match marketing
      await this.tradeService.matchMarketing(createOrderDto.symbol);  
    }
  }

  /**
   * getEstimatedPrice, use Middle price strategy(VWAP)
   * @param symbol 
   * @param quantity 
   */
  async getEstimatedPrice(symbol: number): Promise<number> {
    const orderBookPrice = await this.getOrderBookPrice(symbol);
    // if order book price is not 0, return order book price
    if(orderBookPrice && orderBookPrice > 0) {
      return orderBookPrice;
    }
    // if trade records price is not 0, return trade records price
    const tradeRecordsPrice = await this.tradeService.getTradeRecordsPrice(symbol);
    if(tradeRecordsPrice && tradeRecordsPrice > 0) {
      return tradeRecordsPrice;
    }
    // if order book price and trade records price are  0, use default price
    const symbolData = await this.symbolService.findOne({ symbol });
    if(!symbolData) {
      throw new BadRequestException('Symbol not found');
    }
    const { lastPrice } = symbolData;
    return lastPrice;
    
  }

  /**
   * getOrderBookPrice, use order book price strategy
   * @param symbol 
   * @returns 
   */
  async getOrderBookPrice(symbol: number): Promise<number> {
    const searchSql = 
    `
      SELECT IF(count(*) > 0, IF(count(*) > 1, sum(price) / 2, price), 0) AS estimated_price
      FROM (
      SELECT SUM(price * quantity - deal_quantity) / SUM(quantity - deal_quantity) AS price
      FROM \`order\` 
      WHERE symbol = ${symbol} AND status = ${OrderStatus.PENDING} AND operation = ${OrderOperation.BUY}
      ORDER BY update_time DESC
      limit 20
      UNION ALL
      SELECT SUM(price * quantity - deal_quantity) / SUM(quantity - deal_quantity) AS price
      FROM order 
      WHERE symbol = ${symbol} AND status = ${OrderStatus.PENDING} AND operation = ${OrderOperation.SELL}
      ORDER BY update_time DESC
      limit 20
      )
    `;
    const orderBookData = await this.orderRepository.query(searchSql);
    
    return orderBookData[0].estimated_price;
  }

} 