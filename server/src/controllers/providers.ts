import { Request, Response, NextFunction } from 'express';
import { createProvider, getConfigs, getProviders, getProvidersById, getUsers, updateProvider } from '../services';
import RedisClient from '../models/RedisClient';

export const fetchProviderById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const providerId = req.params.id;
        const filters: any = req.query;
        const userId = filters?.userId ? parseInt(filters?.userId) : null;

        const provider = await getProvidersById(providerId);

        if (!provider) {
            return res.status(404).json({ message: 'Provider not found' });
        }

        let consulted = false;

        if (userId) {
            consulted = await RedisClient.hasUserConsultedProvider(userId, providerId);

            // If not consulted yet, mark it as consulted
            if (!consulted) {
                await RedisClient.setUserConsultedProvider(userId, providerId);
            }
        }

        // Create a response object with conditional fields
        const response: any = {
            ...provider,
            consulted,
        };

        // Hide sensitive information if the user is not logged in
        if (!userId) {
            delete response.email;
            delete response.phone_number;
            delete response.website;
        }

        res.json(response);
    } catch (err) {
        next(err);
    }
};

export const fetchProviders = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const filters = req.query;
        const providers = await getProviders(filters);
        res.json(providers);
    } catch (err) {
        next(err);
    }
};

export const createProviders = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const params = req.body;
        const providers = await createProvider(params);
        res.json(providers);
    } catch (err) {
        next(err);
    }
};

export const updateProviders = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const params = req.query;
        const providers = await updateProvider((params as any)?.id as any, params);
        res.json(providers);
    } catch (err) {
        next(err);
    }
};

export const fetchUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const users = await getUsers();
        res.json(users);
    } catch (err) {
        next(err);
    }
};

export const fetchConfigs = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const users = await getConfigs();
        res.json(users);
    } catch (err) {
        next(err);
    }
};