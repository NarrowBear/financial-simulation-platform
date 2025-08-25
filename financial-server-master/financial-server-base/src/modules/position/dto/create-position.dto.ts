import { IsNotEmpty, IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class CreatePositionDto {
  @IsNotEmpty({ message: '账户ID不能为空' })
  @IsNumber({}, { message: '账户ID必须是数字' })
  accountId: number;

  @IsNotEmpty({ message: '股票代码不能为空' })
  @IsString({ message: '股票代码必须是字符串' })
  symbol: string;

  @IsOptional()
  @IsNumber({}, { message: '持仓数量必须是数字' })
  @Min(0, { message: '持仓数量不能为负数' })
  quantity?: number;

  @IsOptional()
  @IsNumber({}, { message: '冻结数量必须是数字' })
  @Min(0, { message: '冻结数量不能为负数' })
  frozenQuantity?: number;
} 