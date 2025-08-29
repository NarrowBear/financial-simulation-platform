import { IsNotEmpty, IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class CreatePositionDto {
  @IsNotEmpty({ message: 'Account ID cannot be empty' })
  @IsNumber({}, { message: 'Account ID must be a number' })
  accountId: number;

  @IsNotEmpty({ message: 'Symbol cannot be empty' })
  @IsString({ message: 'Symbol must be a string' })
  symbol: string;

  @IsOptional()
  @IsNumber({}, { message: 'Position quantity must be a number' })
  @Min(0, { message: 'Position quantity cannot be negative' })
  quantity?: number;

  @IsOptional()
  @IsNumber({}, { message: 'Frozen quantity must be a number' })
  @Min(0, { message: 'Frozen quantity cannot be negative' })
  frozenQuantity?: number;
} 