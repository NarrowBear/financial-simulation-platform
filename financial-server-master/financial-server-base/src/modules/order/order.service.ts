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

@Injectable()
export class OrderService extends BaseService<Order> {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
    private accountService: AccountService,
    private positionService: PositionService,
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
    const queryRunner = this.orderRepository.manager.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const account = await this.accountService.findOne({accountNo: createOrderDto.accountNo});
      if(!account) {
        throw new BadRequestException('Account not found');
      }
      // lock account
      const lockKey = `account:lock:${createOrderDto.accountNo}`;
      const lockValue = uuidv4();
      const lockResult = await this.redisService.setnx(lockKey, lockValue, 10);
      if(!lockResult) {
        throw new BadRequestException('Lock acquisition failed');
      }
      if(createOrderDto.operation === OrderOperation.BUY) {
        // frozen amount
        await this.accountService.frozenAmountAndBalance(account.id, createOrderDto.quantity * createOrderDto.price);
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
    }
  }

  async findAll(): Promise<Order[]> {
    return await this.orderRepository.find({
      order: { createdTime: 'DESC' }
    });
  }

  async findByAccountId(accountId: number): Promise<Order[]> {
    return await this.orderRepository.find({
      where: { accountId },
      order: { createdTime: 'DESC' }
    });
  }

  async findBySymbol(symbol: number): Promise<Order[]> {
    return await this.orderRepository.find({
      where: { symbol },
      order: { createdTime: 'DESC' }
    });
  }

  async update(id: number, updateOrderDto: UpdateOrderDto): Promise<Order> {
    const order = await this.findOne(id);
    
    // Check if order status allows modification
    if (order.status === OrderStatus.FILLED || order.status === OrderStatus.CANCELLED) {
      throw new BadRequestException('Filled or cancelled orders cannot be modified');
    }

    Object.assign(order, updateOrderDto);
    return await this.orderRepository.save(order);
  }

  async cancelOrder(id: number): Promise<Order> {
    const order = await this.findOne(id);
    
    if (order.status === OrderStatus.FILLED) {
      throw new BadRequestException('Filled orders cannot be cancelled');
    }
    
    if (order.status === OrderStatus.CANCELLED) {
      throw new BadRequestException('Order is already cancelled');
    }

    order.status = OrderStatus.CANCELLED;
    return await this.orderRepository.save(order);
  }

  async remove(id: number): Promise<void> {
    const order = await this.findOne(id);
    await this.orderRepository.remove(order);
  }

  async getPendingOrders(): Promise<Order[]> {
    return await this.orderRepository.find({
      where: { status: OrderStatus.PENDING },
      order: { createdTime: 'ASC' }
    });
  }

  async updateOrderStatus(id: number, status: OrderStatus, dealQuantity?: number): Promise<Order> {
    const order = await this.findOne(id);
    
    order.status = status;
    if (dealQuantity !== undefined) {
      order.dealQuantity = dealQuantity;
    }
    
    return await this.orderRepository.save(order);
  }
} 