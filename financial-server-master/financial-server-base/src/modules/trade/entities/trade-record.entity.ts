import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity('trade_record')
export class TradeRecord {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'account_id', nullable: true, comment: '账户ID' })
  accountId: number;

  @Column({ 
    type: 'varchar', 
    length: 16, 
    nullable: true, 
    comment: '股票' 
  })
  symbol: string;

  @Column({ name: 'order_id', nullable: true, comment: '订单ID' })
  orderId: number;

  @Column({ 
    name: 'order_type',
    type: 'varchar', 
    length: 16, 
    nullable: true, 
    comment: '订单类型' 
  })
  orderType: string;

  @Column({ name: 'trade_quantity', nullable: true, comment: '交易数量' })
  tradeQuantity: number;

  @Column({ 
    type: 'decimal', 
    precision: 18, 
    scale: 2, 
    nullable: true, 
    comment: '交易总金额' 
  })
  price: number;

  @CreateDateColumn({ name: 'created_time' })
  createdTime: Date;

  @UpdateDateColumn({ name: 'update_time' })
  updateTime: Date;
} 