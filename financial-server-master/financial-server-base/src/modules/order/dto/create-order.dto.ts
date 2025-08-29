import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, Min } from 'class-validator';
import { OrderOperation, OrderType } from '../../../common/enums/order.enums';

export class CreateOrderDto {
  @IsNotEmpty({ message: 'Account ID cannot be empty' })
  @IsNumber({}, { message: 'Account ID must be a number' })
  accountId: number;

  @IsNotEmpty({ message: 'Symbol cannot be empty' })
  @IsNumber({}, { message: 'Symbol must be a number' })
  symbol: number;

  @IsOptional()
  @IsString({ message: 'Symbol name must be a string' })
  symbolName?: string;

  @IsNotEmpty({ message: 'Operation type cannot be empty' })
  @IsEnum(OrderOperation, { message: 'Operation type must be Buy or Sell' })
  operation: OrderOperation;

  @IsNotEmpty({ message: 'Order type cannot be empty' })
  @IsEnum(OrderType, { message: 'Order type must be Market or Limit' })
  orderType: OrderType;

  @IsNotEmpty({ message: 'Quantity cannot be empty' })
  @IsNumber({}, { message: 'Quantity must be a number' })
  @Min(1, { message: 'Quantity must be greater than 0' })
  quantity: number;

  @IsOptional()
  @IsNumber({}, { message: 'Price must be a number' })
  @Min(0, { message: 'Price cannot be negative' })
  price?: number;
} 