import { Router } from 'express';
import { getSharedRoutePlan } from '../controllers/logisticsController.js';

const router = Router();

// Shared logistics route optimization
router.get('/shared-plan', getSharedRoutePlan);

export default router;
