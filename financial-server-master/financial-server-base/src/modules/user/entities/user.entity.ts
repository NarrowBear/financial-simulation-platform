import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('user')
export class User {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column({ name: 'user_uin'})
    userUin: string;

    @Column()
    phone: string;

    @Column()
    nickName: string;

    @Column()
    avatar: string;
    
    @Column({ name: 'id_card'})
    idCard: string;

    @Column()
    password: string;
    
    @Column()
    email: string;
    
    @Column({ name: 'real_name'})
    realName: string;
    
    @Column({ name: 'created_time'})
    createdTime: Date;
    
    @Column({ name: 'updated_time'})
    updatedTime: Date;
    
    @Column({ name: 'last_login_time'})
    lastLoginTime: Date;
    
    
    
    
    
}