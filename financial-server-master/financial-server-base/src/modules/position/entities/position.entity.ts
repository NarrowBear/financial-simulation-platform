import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity('positions')
export class Position {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'account_id', nullable: true, comment: 'Account' })
  accountId: number;

  @Column({ 
    type: 'int', 
    length: 16, 
    nullable: true, 
    comment: 'Stock symbol' 
  })
  symbol: number;

  @Column({ nullable: true, comment: 'Position quantity' })
  quantity: number;

  @Column({ name: 'frozen_quantity', nullable: true, comment: 'Frozen quantity' })
  frozenQuantity: number;

  @CreateDateColumn({ name: 'created_time' })
  createdTime: Date;

  @UpdateDateColumn({ name: 'update_time' })
  updateTime: Date;
} 