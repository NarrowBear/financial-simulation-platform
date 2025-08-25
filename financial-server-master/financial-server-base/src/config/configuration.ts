import databaseConfig from "./configuration/database.config";
import redisConfig from "./configuration/redis.config";

export default () => ({
    environment: process.env.NODE_ENV || 'development',
    database: databaseConfig(),
    redis: redisConfig(),
});
