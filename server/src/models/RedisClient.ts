import redisClient from "../redis";

const USER_PREFIX = 'user:';
const CONSULTED_PROVIDERS_PREFIX = 'consulted_providers:';

class RedisClient {

    constructor() { }

    public static hasUserConsultedProvider = async (userId: number, providerId: string) => {
        const key = `${USER_PREFIX}${userId}:${CONSULTED_PROVIDERS_PREFIX}${providerId}`;
        const result = await redisClient.get(key);
        return result !== null;
    };

    public static setUserConsultedProvider = async (userId: number, providerId: string) => {
        const key = `${USER_PREFIX}${userId}:${CONSULTED_PROVIDERS_PREFIX}${providerId}`;
        await redisClient.set(key, 'true');
    };

    public static getAllConsultedProviderIds = async (userId: number) => {
        const pattern = `${USER_PREFIX}${userId}:${CONSULTED_PROVIDERS_PREFIX}*`;
        const keys = await redisClient.keys(pattern);

        const providerIds = keys.map(key => {
            const parts = key.split(':');
            return parts[parts.length - 1];
        });

        return providerIds;
    };
}

export default RedisClient;