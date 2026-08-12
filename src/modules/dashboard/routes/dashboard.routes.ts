import { Router } from 'express';

import { DashboardController } from '../controllers/dashboard.controller';

import { authenticate } from '../../../middlewares/auth.middleware';
import { asyncHandler } from '../../../utils/asyncHandler';

const router = Router();

router.get('/', authenticate, asyncHandler(DashboardController.getStatistics));

export default router;
