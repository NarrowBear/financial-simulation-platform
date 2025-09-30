import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Position } from './entities/position.entity';
import { CreatePositionDto } from './dto/create-position.dto';
import { UpdatePositionDto } from './dto/update-position.dto';
import { v4 as uuidv4 } from 'uuid';
import { RedisService } from 'src/common/service/redis.service';
import { BaseService } from 'src/common/service/base.service';

@Injectable()
export class PositionService extends BaseService<Position> {
  constructor(
    @InjectRepository(Position)
    private positionRepository: Repository<Position>,
    private readonly redisService: RedisService,
  ) {
    super(positionRepository);
  }

  /**
   * Frozen symbol quantity
   * @param accountId 
   * @param symbol 
   * @param quantity 
   * @returns 
   */
  async frozenSymbolQuantity(accountId: number, symbol: number, frozenQuantity: number): Promise<boolean> {
    const position = await this.positionRepository.findOne({ where: { accountId, symbol } });
    if(!position) {
      throw new BadRequestException('Position record does not exist');
    }
    if(frozenQuantity > position.quantity) {
      throw new BadRequestException('Insufficient position quantity');
    }
    position.frozenQuantity += frozenQuantity;
    position.quantity -= frozenQuantity;
    await this.positionRepository.update(position.id, { frozenQuantity: position.frozenQuantity, quantity: position.quantity });
    return true;
  }

  /**
   * Create position
   * @param createPositionDto 
   * @returns 
   */
  async create(createPositionDto: CreatePositionDto): Promise<Position> {
    // Check if position already exists for the same account and symbol
    const existingPosition = await this.positionRepository.findOne({
        where: {
          accountId: createPositionDto.accountId,
          symbol: Number(createPositionDto.symbol),
        },
      });

    if (existingPosition) {
      throw new BadRequestException('Position record already exists for this account and symbol');
    }

    const position = this.positionRepository.create({
      ...createPositionDto,
      symbol: createPositionDto.symbol,
      quantity: createPositionDto.quantity || 0,
      frozenQuantity: createPositionDto.frozenQuantity || 0,
    });

    const savedPosition = await this.positionRepository.save(position);
    return savedPosition;
  }

  // Freeze position quantity
  async freezeQuantity(accountId: number, symbol: number, quantity: number): Promise<Position> {
    const position = await this.positionRepository.findOne({
      where: { accountId, symbol }
    });
    
    if (!position) {
      throw new BadRequestException('Position record does not exist');
    }
    
    if (position.quantity < quantity) {
      throw new BadRequestException('Insufficient position quantity');
    }
    
    position.quantity -= quantity;
    position.frozenQuantity += quantity;
    
    return await this.positionRepository.save(position);
  }

  // Unfreeze position quantity
  async unfreezeQuantity(accountId: number, symbol: number, quantity: number): Promise<Position> {
    const position = await this.positionRepository.findOne({
      where: { accountId, symbol }
    });
    
    if (!position) {
      throw new BadRequestException('Position record does not exist');
    }
    
    if (position.frozenQuantity < quantity) {
      throw new BadRequestException('Insufficient frozen quantity');
    }
    
    position.frozenQuantity -= quantity;
    position.quantity += quantity;
    
    return await this.positionRepository.save(position);
  }
} 