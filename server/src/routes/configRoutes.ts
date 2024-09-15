import { Router } from 'express';
import ConfigController from '../controllers/configController';

const router = Router();

/**
 * Route to retrieve all configurations.
 * GET /configs
 * Calls ConfigController.all to handle the request.
 */
router.get('/configs', ConfigController.all);

export default router;
