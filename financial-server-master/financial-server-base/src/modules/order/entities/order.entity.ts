import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { OrderOperation, OrderType, OrderStatus } from "../../../common/enums/order.enums";

@Entity('order')
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'account_id', nullable: true, comment: '所属账号ID' })
  accountId: number;

  @Column({ nullable: true, comment: '股票代码' })
  symbol: number;

  @Column({ name: 'symbol_name', length: 50, nullable: true, comment: '股票名称' })
  symbolName: string;

  @Column({ 
    type: 'varchar', 
    length: 16, 
    nullable: true, 
    comment: '操作类型（Buy，Sell）',
    enum: OrderOperation
  })
  operation: OrderOperation;

  @Column({ 
    name: 'order_type',
    type: 'varchar', 
    length: 16, 
    nullable: true, 
    comment: '订单类型（Market/Limit）',
    enum: OrderType
  })
  orderType: OrderType;

  @Column({ nullable: true, comment: '数量' })
  quantity: number;

  @Column({ 
    type: 'decimal', 
    precision: 18, 
    scale: 2, 
    nullable: true, 
    comment: '价格（限价单）' 
  })
  price: number;

  @Column({ name: 'deal_quantity', nullable: true, comment: '已成交数量' })
  dealQuantity: number;

  @Column({ 
    type: 'varchar', 
    length: 16, 
    nullable: true, 
    comment: '状态',
    enum: OrderStatus
  })
  status: OrderStatus;

  @CreateDateColumn({ name: 'created_time' })
  createdTime: Date;

  @UpdateDateColumn({ name: 'update_time' })
  updateTime: Date;
} 