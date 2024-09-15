import { Router } from 'express';
import ServiceController from '../controllers/serviceController';

const router = Router();

/**
 * Route to create a new service.
 * POST /services
 * Calls ServiceController.create to handle the request.
 */
router.post('/services', ServiceController.create);

/**
 * Route to retrieve all services.
 * GET /services
 * Calls ServiceController.findAll to handle the request.
 */
router.get('/services', ServiceController.findAll);

export default router;