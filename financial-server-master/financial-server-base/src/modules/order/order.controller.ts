import { 
  Controller, 
  Get, 
  Post, 
  Body, 
  Patch, 
  Param, 
  Delete, 
  Query,
  ParseIntPipe,
  HttpCode,
  HttpStatus
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './entities/order.entity';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createOrderDto: CreateOrderDto): Promise<Order> {
    return await this.orderService.create(createOrderDto);
  }

  @Get()
  async findAll(@Query('accountId') accountId?: string): Promise<Order[]> {
    if (accountId) {
      return await this.orderService.findByAccountId(parseInt(accountId));
    }
    return await this.orderService.findAll();
  }

  @Get('symbol/:symbol')
  async findBySymbol(@Param('symbol', ParseIntPipe) symbol: number): Promise<Order[]> {
    return await this.orderService.findBySymbol(symbol);
  }

  @Get('pending')
  async getPendingOrders(): Promise<Order[]> {
    return await this.orderService.getPendingOrders();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Order> {
    return await this.orderService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number, 
    @Body() updateOrderDto: UpdateOrderDto
  ): Promise<Order> {
    return await this.orderService.update(id, updateOrderDto);
  }

  @Patch(':id/cancel')
  @HttpCode(HttpStatus.OK)
  async cancelOrder(@Param('id', ParseIntPipe) id: number): Promise<Order> {
    return await this.orderService.cancelOrder(id);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return await this.orderService.remove(id);
  }
} 