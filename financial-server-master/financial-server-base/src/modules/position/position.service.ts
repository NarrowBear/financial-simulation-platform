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

  async create(createPositionDto: CreatePositionDto): Promise<Position> {
    // Check if position already exists for the same account and symbol
    const existingPosition = await this.positionRepository.findOne({
      where: {
        accountId: createPositionDto.accountId,
        symbol: createPositionDto.symbol,
      },
    });

    if (existingPosition) {
      throw new BadRequestException('Position record already exists for this account and symbol');
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
      throw new NotFoundException(`Position ID ${id} does not exist`);
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

  // Increase position quantity
  async increaseQuantity(accountId: number, symbol: string, quantity: number): Promise<Position> {
    let position = await this.findByAccountAndSymbol(accountId, symbol);
    
    if (!position) {
      // If position record doesn't exist, create a new one
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

  // Decrease position quantity
  async decreaseQuantity(accountId: number, symbol: string, quantity: number): Promise<Position> {
    const position = await this.findByAccountAndSymbol(accountId, symbol);
    
    if (!position) {
      throw new BadRequestException('Position record does not exist');
    }
    
    if (position.quantity < quantity) {
      throw new BadRequestException('Insufficient position quantity');
    }
    
    position.quantity -= quantity;
    
    // If position quantity becomes 0, remove the record
    if (position.quantity === 0) {
      await this.positionRepository.remove(position);
      return position;
    }
    
    return await this.positionRepository.save(position);
  }

  // Freeze position quantity
  async freezeQuantity(accountId: number, symbol: string, quantity: number): Promise<Position> {
    const position = await this.findByAccountAndSymbol(accountId, symbol);
    
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
  async unfreezeQuantity(accountId: number, symbol: string, quantity: number): Promise<Position> {
    const position = await this.findByAccountAndSymbol(accountId, symbol);
    
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