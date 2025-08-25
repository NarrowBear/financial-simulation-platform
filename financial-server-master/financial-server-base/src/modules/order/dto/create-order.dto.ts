import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, Min } from 'class-validator';
import { OrderOperation, OrderType } from '../../../common/enums/order.enums';

export class CreateOrderDto {
  @IsNotEmpty({ message: '账号ID不能为空' })
  @IsNumber({}, { message: '账号ID必须是数字' })
  accountId: number;

  @IsNotEmpty({ message: '股票代码不能为空' })
  @IsNumber({}, { message: '股票代码必须是数字' })
  symbol: number;

  @IsOptional()
  @IsString({ message: '股票名称必须是字符串' })
  symbolName?: string;

  @IsNotEmpty({ message: '操作类型不能为空' })
  @IsEnum(OrderOperation, { message: '操作类型必须是Buy或Sell' })
  operation: OrderOperation;

  @IsNotEmpty({ message: '订单类型不能为空' })
  @IsEnum(OrderType, { message: '订单类型必须是Market或Limit' })
  orderType: OrderType;

  @IsNotEmpty({ message: '数量不能为空' })
  @IsNumber({}, { message: '数量必须是数字' })
  @Min(1, { message: '数量必须大于0' })
  quantity: number;

  @IsOptional()
  @IsNumber({}, { message: '价格必须是数字' })
  @Min(0, { message: '价格不能为负数' })
  price?: number;
} 