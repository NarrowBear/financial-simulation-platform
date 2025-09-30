import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity('trade_record')
export class TradeRecord {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'account_id', nullable: true, comment: 'Account ID' })
  accountId: number;

  @Column({ 
    type: 'int', 
    nullable: true, 
    comment: 'Stock Symbol' 
  })
  symbol: number;

  @Column({ name: 'order_id', nullable: true, comment: 'Order ID' })
  orderId: number;

  @Column({ 
    name: 'order_type',
    type: 'varchar', 
    length: 16, 
    nullable: true, 
    comment: 'Order Type' 
  })
  orderType: string;

  @Column({ name: 'trade_quantity', nullable: true, comment: 'Trade Quantity' })
  tradeQuantity: number;

  @Column({ 
    type: 'decimal', 
    precision: 18, 
    scale: 2, 
    nullable: true, 
    comment: 'Total Trade Amount' 
  })
  price: number;

  @CreateDateColumn({ name: 'created_time' })
  createdTime: Date;

  @UpdateDateColumn({ name: 'update_time' })
  updateTime: Date;
} 