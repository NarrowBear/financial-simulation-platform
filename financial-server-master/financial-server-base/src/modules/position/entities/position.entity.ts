import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity('positions')
export class Position {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'account_id', nullable: true, comment: '账户' })
  accountId: number;

  @Column({ 
    type: 'varchar', 
    length: 16, 
    nullable: true, 
    comment: '股票代码' 
  })
  symbol: string;

  @Column({ nullable: true, comment: '持仓数量' })
  quantity: number;

  @Column({ name: 'frozen_quantity', nullable: true, comment: '冻结数量' })
  frozenQuantity: number;

  @CreateDateColumn({ name: 'created_time' })
  createdTime: Date;

  @UpdateDateColumn({ name: 'update_time' })
  updateTime: Date;
} 