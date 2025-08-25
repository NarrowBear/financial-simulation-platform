import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Index } from "typeorm";
import { SymbolStatus, MarketType } from "../../../common/enums/symbol.enums";

@Entity('symbols')
@Index(['symbol'], { unique: true })
export class Symbol {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ 
    type: 'varchar', 
    length: 16, 
    nullable: true, 
    comment: '股票代码' 
  })
  symbol: string;

  @Column({ 
    name: 'symbol_name',
    type: 'varchar', 
    length: 128, 
    nullable: true, 
    comment: '股票名称' 
  })
  symbolName: string;

  @Column({ 
    type: 'varchar', 
    length: 10, 
    nullable: true, 
    comment: '所属交易市场',
    enum: MarketType
  })
  market: MarketType;

  @Column({ name: 'lot_size', nullable: true, comment: '最少交易数量' })
  lotSize: number;

  @Column({ 
    name: 'tick_size',
    type: 'decimal', 
    precision: 18, 
    scale: 2, 
    nullable: true, 
    comment: '最小交易金额' 
  })
  tickSize: number;

  @Column({ 
    type: 'varchar', 
    length: 10, 
    nullable: true, 
    comment: '状态',
    enum: SymbolStatus
  })
  status: SymbolStatus;

  @Column({ 
    name: 'last_price',
    type: 'decimal', 
    precision: 18, 
    scale: 2, 
    nullable: true, 
    comment: '最新成交价' 
  })
  lastPrice: number;

  @Column({ 
    name: 'prev_close',
    type: 'decimal', 
    precision: 18, 
    scale: 2, 
    nullable: true, 
    comment: '收盘价' 
  })
  prevClose: number;

  @CreateDateColumn({ name: 'created_time' })
  createdTime: Date;

  @UpdateDateColumn({ name: 'update_time' })
  updateTime: Date;
} 