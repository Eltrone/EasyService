// src/routes/serviceProviderRoutes.ts
import { Router } from 'express';
import { createServiceProvider } from '../controllers/serviceProviderController';

const router = Router();

router.post('/', createServiceProvider);

export default router;
