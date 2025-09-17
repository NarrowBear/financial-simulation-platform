import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Symbol } from './entities/symbol.entity';
import { SymbolService } from './symbol.service';

@Module({
  imports: [TypeOrmModule.forFeature([Symbol])],
  providers: [SymbolService],
  exports: [SymbolService]
})
export class SymbolModule {}
