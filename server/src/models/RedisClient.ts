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
        await redisClient.set(key, 'true'); // Store 'true' as a value to mark as consulted
    };

    // Method to get all keys starting with USER_PREFIX
    public static getAllConsultedProviderIds = async (userId: number) => {
        const pattern = `${USER_PREFIX}${userId}:${CONSULTED_PROVIDERS_PREFIX}*`; // Pattern to match all user keys
        const keys = await redisClient.keys(pattern);

        // Extract provider IDs from the keys
        const providerIds = keys.map(key => {
            // Extracting the providerId from the key
            const parts = key.split(':');
            return parts[parts.length - 1]; // Get the last part, which is the providerId
        });

        return providerIds;
    };
}

export default RedisClient;