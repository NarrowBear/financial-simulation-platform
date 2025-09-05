import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { OrderOperation, OrderType, OrderStatus } from "../../../common/enums/order.enums";

@Entity('order')
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'account_id', nullable: true, comment: 'Account ID' })
  accountId: number;

  @Column({ nullable: true, comment: 'Stock symbol' })
  symbol: number;

  @Column({ name: 'symbol_name', length: 50, nullable: true, comment: 'Stock name' })
  symbolName: string;

  @Column({ 
    type: 'varchar', 
    length: 16, 
    nullable: true, 
    comment: 'Operation type (Buy, Sell)',
    enum: OrderOperation
  })
  operation: OrderOperation;

  @Column({ 
    name: 'order_type',
    type: 'varchar', 
    length: 16, 
    nullable: true, 
    comment: 'Order type (Market/Limit)',
    enum: OrderType
  })
  orderType: OrderType;

  @Column({ nullable: true, comment: 'Quantity' })
  quantity: number;

  @Column({ 
    type: 'decimal', 
    precision: 18, 
    scale: 2, 
    nullable: true, 
    comment: 'Price (for limit orders)' 
  })
  price: number;

  @Column({ name: 'deal_quantity', nullable: true, comment: 'Dealt quantity' })
  dealQuantity: number;

  @Column({ 
    type: 'varchar', 
    length: 16, 
    nullable: true, 
    comment: 'Status',
    enum: OrderStatus
  })
  status: OrderStatus;

  @Column({ name: 'max_slippage', nullable: true, comment: 'Max slippage' })
  maxSlippage: number;

  @Column({ name: 'min_slippage', nullable: true, comment: 'Min slippage' })
  minSlippage: number;

  @CreateDateColumn({ name: 'created_time' })
  createdTime: Date;

  @UpdateDateColumn({ name: 'update_time' })
  updateTime: Date;
} 