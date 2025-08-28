import { OnModuleInit, OnModuleDestroy } from "@nestjs/common";
import Redis from "ioredis";
import { ConfigService } from "@nestjs/config";

export class RedisService implements OnModuleInit, OnModuleDestroy {
    private client: Redis;

    constructor(private configService: ConfigService) {}

    async onModuleInit() {
        this.client = new Redis({
            host: this.configService.get('redis.host'),
            port: this.configService.get('redis.port'),
            password: this.configService.get('redis.password'),
        });
    }

    async onModuleDestroy() {
        if (this.client) {
            await this.client.quit();
        }
    }

    /**
     * Get value by key
     * @param key 
     */
    async get(key: string) {
        return await this.client.get(key);
    }

    /**
     * Set value by key
     * @param key 
     * @param value 
        */
    async set(key: string, value: string) {
        return await this.client.set(key, value);
    }

    /**
     * Delete value by key
     * @param key 
     */
    async del(key: string) {
        return await this.client.del(key);
    }   

    /**
     * Check if key exists
     * @param key 
     */
    async exists(key: string) { 
        return await this.client.exists(key);
    }

    /**
     * Get all keys by pattern
     */     
    async keys(pattern: string) {
        return await this.client.keys(pattern);
    }

    /**
     * Set value with expiration
     * @param key 
     * @param value 
     * @param expireTime seconds
     */
    async setex(key: string, value: string, expireTime: number) {
        return await this.client.setex(key, expireTime, value);
    }

    /**
     * Set value with expiration only if key doesn't exist (NX)
     * @param key 
     * @param value 
     * @param expireTime seconds
     */
    async setnx(key: string, value: string, expireTime: number) {
        return await this.client.set(key, value, 'EX', expireTime, 'NX');
    }

    /**
     * Get Redis client instance
     */
    getClient(): Redis {
        return this.client;
    }

    /**
     * Acquire distributed lock
     * @param lockKey Lock key
     * @param lockValue Unique identifier for the lock
     * @param expireTime Lock expiration time in seconds
     * @returns true if lock acquired, false otherwise
     */
    async acquireLock(lockKey: string, lockValue: string, expireTime: number = 30): Promise<boolean> {
        const result = await this.client.set(lockKey, lockValue, 'EX', expireTime, 'NX');
        return result === 'OK';
    }

    /**
     * Release distributed lock
     * @param lockKey Lock key
     * @param lockValue Lock value to verify ownership
     * @returns true if lock released, false otherwise
     */
    async releaseLock(lockKey: string, lockValue: string): Promise<boolean> {
        const script = `
            if redis.call("get", KEYS[1]) == ARGV[1] then
                return redis.call("del", KEYS[1])
            else
                return 0
            end
        `;
        const result = await this.client.eval(script, 1, lockKey, lockValue);
        return result === 1;
    }

    /**
     * Try to acquire lock with retry mechanism
     * @param lockKey Lock key
     * @param lockValue Unique identifier for the lock
     * @param expireTime Lock expiration time in seconds
     * @param retryCount Number of retries
     * @param retryDelay Delay between retries in milliseconds
     * @returns true if lock acquired, false otherwise
     */
    async acquireLockWithRetry(
        lockKey: string, 
        lockValue: string, 
        expireTime: number = 30,
        retryCount: number = 3,
        retryDelay: number = 100
    ): Promise<boolean> {
        for (let i = 0; i < retryCount; i++) {
            if (await this.acquireLock(lockKey, lockValue, expireTime)) {
                return true;
            }
            if (i < retryCount - 1) {
                await new Promise(resolve => setTimeout(resolve, retryDelay));
            }
        }
        return false;
    }
}
