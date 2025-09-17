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


} 