import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PositionService } from './position.service';
import { PositionController } from './position.controller';
import { Position } from './entities/position.entity';
import { RedisModule } from '../../common/module/redis.module';

@Module({
  imports: [TypeOrmModule.forFeature([Position]), RedisModule],
  controllers: [PositionController],
  providers: [PositionService],
  exports: [PositionService],
})
export class PositionModule {} 