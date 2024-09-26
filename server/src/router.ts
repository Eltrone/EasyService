import { Router } from 'express';
import { fetchProviders, fetchProviderById, fetchUsers, createProviders, updateProviders, fetchConfigs } from './controllers/providers';
import AuthController from './controllers/authController';
import passport from './passport';
import RedisClient from './models/RedisClient';
import { getProvidersById } from './services';
import { creatContact } from './controllers/contacts';

const router = Router();
router.get('/configs', fetchConfigs);
router.get('/providers', fetchProviders);
router.get('/providers/:id', fetchProviderById);
router.get('/users', fetchUsers);
router.post('/providers', createProviders);
router.put('/providers/:id', passport.authenticate('jwt', { session: false }), updateProviders);
router.post('/register', AuthController.register);
router.post('/login', AuthController.login);
router.post('/logout', AuthController.logout);
router.post('/contacts', creatContact);

router.get(
    '/protected',
    passport.authenticate('jwt', { session: false }),
    async (req, res) => {
        const user = req.user;
        const providerIds = await RedisClient.getAllConsultedProviderIds((user as any).id);
        const providers = await Promise.all(providerIds.map(id => getProvidersById(id)));
        const payload = {
            ...user,
            providers
        }
        res.json({ message: 'You are authorized', user: payload });
    }
);

export default router;