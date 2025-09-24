import { Injectable } from "@nestjs/common";
import { Repository, ObjectLiteral, DeepPartial, FindOptionsWhere } from "typeorm";

@Injectable()
export class BaseService<T extends ObjectLiteral> {
    constructor(protected readonly respository: Repository<T>) {}

    async findAll(): Promise<T[]> {
        return this.respository.find();
    }

    async findOne(condition: FindOptionsWhere<T> | FindOptionsWhere<T>[]): Promise<T | null> {
        if (Array.isArray(condition)) {
            return this.respository.findOne({ where: condition });
        }
        return this.respository.findOneBy(condition);
    }

    async findBy(condition: FindOptionsWhere<T> | FindOptionsWhere<T>[]): Promise<T[]> {
        return this.respository.findBy(condition);
    }

    async create(entity: DeepPartial<T>): Promise<T> {
        const newEntity = this.respository.create(entity);
        return this.respository.save(newEntity);
    }

    async update(id: number, entity: Partial<T>): Promise<any> {
        return this.respository.update(id, entity);   
    }

    async exists(condition: FindOptionsWhere<T> | FindOptionsWhere<T>[]): Promise<boolean> {
        return this.respository.exists({ where: condition });
    }
}
