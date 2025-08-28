import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Position } from './entities/position.entity';
import { CreatePositionDto } from './dto/create-position.dto';
import { UpdatePositionDto } from './dto/update-position.dto';
import { v4 as uuidv4 } from 'uuid';
import { RedisService } from 'src/common/service/redis.service';

@Injectable()
export class PositionService {
  constructor(
    @InjectRepository(Position)
    private positionRepository: Repository<Position>,
    private readonly redisService: RedisService,
  ) {}

  /**
   * Frozen symbol quantity
   * @param accountId 
   * @param symbol 
   * @param quantity 
   * @returns 
   */
  async frozenSymbolQuantity(accountId: number, symbol: string, frozenQuantity: number): Promise<boolean> {
    const position = await this.positionRepository.findOne({ where: { accountId, symbol } });
    if(!position) {
      throw new BadRequestException('持仓记录不存在');
    }
    if(frozenQuantity > position.quantity) {
      throw new BadRequestException('持仓数量不足');
    }
    position.frozenQuantity += frozenQuantity;
    position.quantity -= frozenQuantity;
    await this.positionRepository.update(position.id, { frozenQuantity: position.frozenQuantity, quantity: position.quantity });
    return true;
  }

  async create(createPositionDto: CreatePositionDto): Promise<Position> {
    // 检查是否已存在相同账户和股票的持仓
    const existingPosition = await this.positionRepository.findOne({
      where: {
        accountId: createPositionDto.accountId,
        symbol: createPositionDto.symbol,
      },
    });

    if (existingPosition) {
      throw new BadRequestException('该账户已存在该股票的持仓记录');
    }

    const position = this.positionRepository.create({
      ...createPositionDto,
      quantity: createPositionDto.quantity || 0,
      frozenQuantity: createPositionDto.frozenQuantity || 0,
    });

    return await this.positionRepository.save(position);
  }

  async findAll(): Promise<Position[]> {
    return await this.positionRepository.find({
      order: { updateTime: 'DESC' }
    });
  }

  async findByAccountId(accountId: number): Promise<Position[]> {
    return await this.positionRepository.find({
      where: { accountId },
      order: { updateTime: 'DESC' }
    });
  }

  async findBySymbol(symbol: string): Promise<Position[]> {
    return await this.positionRepository.find({
      where: { symbol },
      order: { updateTime: 'DESC' }
    });
  }

  async findOne(id: number): Promise<Position> {
    const position = await this.positionRepository.findOne({ where: { id } });
    if (!position) {
      throw new NotFoundException(`持仓ID ${id} 不存在`);
    }
    return position;
  }

  async findByAccountAndSymbol(accountId: number, symbol: string): Promise<Position | null> {
    return await this.positionRepository.findOne({
      where: { accountId, symbol }
    });
  }

  async update(id: number, updatePositionDto: UpdatePositionDto): Promise<Position> {
    const position = await this.findOne(id);
    Object.assign(position, updatePositionDto);
    return await this.positionRepository.save(position);
  }

  async remove(id: number): Promise<void> {
    const position = await this.findOne(id);
    await this.positionRepository.remove(position);
  }

  // 增加持仓数量
  async increaseQuantity(accountId: number, symbol: string, quantity: number): Promise<Position> {
    let position = await this.findByAccountAndSymbol(accountId, symbol);
    
    if (!position) {
      // 如果不存在持仓记录，创建一个新的
      position = await this.create({
        accountId,
        symbol,
        quantity,
        frozenQuantity: 0,
      });
    } else {
      position.quantity += quantity;
      await this.positionRepository.save(position);
    }
    
    return position;
  }

  // 减少持仓数量
  async decreaseQuantity(accountId: number, symbol: string, quantity: number): Promise<Position> {
    const position = await this.findByAccountAndSymbol(accountId, symbol);
    
    if (!position) {
      throw new BadRequestException('持仓记录不存在');
    }
    
    if (position.quantity < quantity) {
      throw new BadRequestException('持仓数量不足');
    }
    
    position.quantity -= quantity;
    
    // 如果持仓数量为0，删除该记录
    if (position.quantity === 0) {
      await this.positionRepository.remove(position);
      return position;
    }
    
    return await this.positionRepository.save(position);
  }

  // 冻结持仓数量
  async freezeQuantity(accountId: number, symbol: string, quantity: number): Promise<Position> {
    const position = await this.findByAccountAndSymbol(accountId, symbol);
    
    if (!position) {
      throw new BadRequestException('持仓记录不存在');
    }
    
    if (position.quantity < quantity) {
      throw new BadRequestException('持仓数量不足');
    }
    
    position.quantity -= quantity;
    position.frozenQuantity += quantity;
    
    return await this.positionRepository.save(position);
  }

  // 解冻持仓数量
  async unfreezeQuantity(accountId: number, symbol: string, quantity: number): Promise<Position> {
    const position = await this.findByAccountAndSymbol(accountId, symbol);
    
    if (!position) {
      throw new BadRequestException('持仓记录不存在');
    }
    
    if (position.frozenQuantity < quantity) {
      throw new BadRequestException('冻结数量不足');
    }
    
    position.frozenQuantity -= quantity;
    position.quantity += quantity;
    
    return await this.positionRepository.save(position);
  }
} 