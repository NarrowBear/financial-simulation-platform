import { Injectable } from "@nestjs/common";
import { Repository, ObjectLiteral, DeepPartial } from "typeorm";


@Injectable()
export class BaseService<T extends ObjectLiteral> {
    constructor(private readonly respository: Repository<T>) {}

    async findAll(): Promise<T[]> {
        return await this.respository.find();
    }

    async findOne(condition: Partial<T>): Promise<T | null> {
        return await this.respository.findOneBy(condition);
    }

    async create(entity: DeepPartial<T>): Promise<T> {
        const newEntity = this.respository.create(entity);
        return await this.respository.save(newEntity);
    }

    async update(id: number, entity: Partial<T>): Promise<any> {
        return await this.respository.update(id, entity);   
    }
} 