import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { OrderStatus, OrderType } from '../../common/enums/order.enums';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { BaseService } from '../../common/service/base.service';

@Injectable()
export class OrderService extends BaseService<Order> {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
  ) {
    super(orderRepository);
  }

  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    // 验证限价单必须提供价格
    if (createOrderDto.orderType === OrderType.LIMIT && !createOrderDto.price) {
      throw new BadRequestException('限价单必须提供价格');
    }

    // 验证市价单不能提供价格
    if (createOrderDto.orderType === OrderType.MARKET && createOrderDto.price) {
      throw new BadRequestException('市价单不能提供价格');
    }

    const order = this.orderRepository.create({
      ...createOrderDto,
      dealQuantity: 0,
      status: OrderStatus.PENDING,
    });

    return await this.orderRepository.save(order);
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

  async findOne(id: number): Promise<Order> {
    const order = await this.orderRepository.findOne({ where: { id } });
    if (!order) {
      throw new NotFoundException(`订单ID ${id} 不存在`);
    }
    return order;
  }

  async update(id: number, updateOrderDto: UpdateOrderDto): Promise<Order> {
    const order = await this.findOne(id);
    
    // 检查订单状态是否允许修改
    if (order.status === OrderStatus.FILLED || order.status === OrderStatus.CANCELLED) {
      throw new BadRequestException('已成交或已取消的订单不能修改');
    }

    Object.assign(order, updateOrderDto);
    return await this.orderRepository.save(order);
  }

  async cancelOrder(id: number): Promise<Order> {
    const order = await this.findOne(id);
    
    if (order.status === OrderStatus.FILLED) {
      throw new BadRequestException('已成交的订单不能取消');
    }
    
    if (order.status === OrderStatus.CANCELLED) {
      throw new BadRequestException('订单已经是取消状态');
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