import { OnModuleInit, OnModuleDestroy } from "@nestjs/common";
import Redis from "ioredis";
import { ConfigService } from "@nestjs/config";

export class RedisService implements OnModuleInit, OnModuleDestroy {
    private client: Redis;

    constructor(private configService: ConfigService) {}

    async onModuleInit() {
        const client = new Redis({
            host: this.configService.get('redis.host'),
            port: this.configService.get('redis.port'),
            password: this.configService.get('redis.password'),
        });
    }

    async onModuleDestroy() {
        await this.client.quit();
    }

    /**
     * get value by key
     * @param key 
     */
    async get(key: string) {
        return await this.client.get(key);
    }

    /**
     * set value by key
     * @param key 
     * @param value 
        */
    async set(key: string, value: string) {
        return await this.client.set(key, value);
    }

    /**
     * delete value by key
     * @param key 
     */
    async del(key: string) {
        return await this.client.del(key);
    }   

    /**
     * check if key exists
     * @param key 
     */
    async exists(key: string) { 
        return await this.client.exists(key);
    }

    /**
     * get all keys
     */     
    async keys(pattern: string) {
        return await this.client.keys(pattern);
    }
    

}
