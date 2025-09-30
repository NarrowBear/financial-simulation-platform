import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Currency } from "src/common/enums/currency.enum";
import { AccountStatus } from "src/common/enums/account.enums";

@Entity('account')
export class Account {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'user_id'})
    userId: number;

    @Column({ name: 'account_no'})
    accountNo: string;

    @Column()
    balance: number;

    @Column()
    frozen: number;

    @Column()
    currency: Currency;

    @Column({ name: 'status'})
    status: AccountStatus;

    @Column({ name: 'created_time'})
    createdTime: Date;
    
    @Column({ name: 'updated_time'})
    updatedTime: Date;
}