import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Index } from "typeorm";
import { SymbolStatus, MarketType } from "../../../common/enums/symbol.enums";

@Entity('symbols')
@Index(['symbol'], { unique: true })
export class Symbol {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ 
    type: 'int', 
    nullable: true, 
    comment: 'Stock symbol' 
  })
  symbol: number;

  @Column({ 
    name: 'symbol_name',
    type: 'varchar', 
    length: 128, 
    nullable: true, 
    comment: 'Stock name' 
  })
  symbolName: string;

  @Column({ 
    type: 'varchar', 
    length: 10, 
    nullable: true, 
    comment: 'Trading market',
    enum: MarketType
  })
  market: MarketType;

  @Column({ name: 'lot_size', nullable: true, comment: 'Minimum trading quantity' })
  lotSize: number;

  @Column({ 
    name: 'tick_size',
    type: 'decimal', 
    precision: 18, 
    scale: 2, 
    nullable: true, 
    comment: 'Minimum trading amount' 
  })
  tickSize: number;

  @Column({ 
    type: 'varchar', 
    length: 10, 
    nullable: true, 
    comment: 'Status',
    enum: SymbolStatus
  })
  status: SymbolStatus;

  @Column({ 
    name: 'last_price',
    type: 'decimal', 
    precision: 18, 
    scale: 2, 
    nullable: true, 
    comment: 'Last traded price' 
  })
  lastPrice: number;

  @Column({ 
    name: 'prev_close',
    type: 'decimal', 
    precision: 18, 
    scale: 2, 
    nullable: true, 
    comment: 'Previous closing price' 
  })
  prevClose: number;

  @CreateDateColumn({ name: 'created_time' })
  createdTime: Date;

  @UpdateDateColumn({ name: 'update_time' })
  updateTime: Date;
} 