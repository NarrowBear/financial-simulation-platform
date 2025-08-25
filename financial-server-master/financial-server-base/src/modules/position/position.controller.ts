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
import { PositionService } from './position.service';
import { CreatePositionDto } from './dto/create-position.dto';
import { UpdatePositionDto } from './dto/update-position.dto';
import { Position } from './entities/position.entity';

@Controller('positions')
export class PositionController {
  constructor(private readonly positionService: PositionService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createPositionDto: CreatePositionDto): Promise<Position> {
    return await this.positionService.create(createPositionDto);
  }

  @Get()
  async findAll(@Query('accountId') accountId?: string): Promise<Position[]> {
    if (accountId) {
      return await this.positionService.findByAccountId(parseInt(accountId));
    }
    return await this.positionService.findAll();
  }

  @Get('symbol/:symbol')
  async findBySymbol(@Param('symbol') symbol: string): Promise<Position[]> {
    return await this.positionService.findBySymbol(symbol);
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Position> {
    return await this.positionService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number, 
    @Body() updatePositionDto: UpdatePositionDto
  ): Promise<Position> {
    return await this.positionService.update(id, updatePositionDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return await this.positionService.remove(id);
  }

  // 业务操作接口
  @Post('increase')
  @HttpCode(HttpStatus.OK)
  async increaseQuantity(
    @Body() body: { accountId: number; symbol: string; quantity: number }
  ): Promise<Position> {
    return await this.positionService.increaseQuantity(
      body.accountId,
      body.symbol,
      body.quantity
    );
  }

  @Post('decrease')
  @HttpCode(HttpStatus.OK)
  async decreaseQuantity(
    @Body() body: { accountId: number; symbol: string; quantity: number }
  ): Promise<Position> {
    return await this.positionService.decreaseQuantity(
      body.accountId,
      body.symbol,
      body.quantity
    );
  }

  @Post('freeze')
  @HttpCode(HttpStatus.OK)
  async freezeQuantity(
    @Body() body: { accountId: number; symbol: string; quantity: number }
  ): Promise<Position> {
    return await this.positionService.freezeQuantity(
      body.accountId,
      body.symbol,
      body.quantity
    );
  }

  @Post('unfreeze')
  @HttpCode(HttpStatus.OK)
  async unfreezeQuantity(
    @Body() body: { accountId: number; symbol: string; quantity: number }
  ): Promise<Position> {
    return await this.positionService.unfreezeQuantity(
      body.accountId,
      body.symbol,
      body.quantity
    );
  }
} 