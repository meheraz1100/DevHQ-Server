import { Router } from 'express';

import { authenticate } from '../../../middlewares/auth.middleware';
import { requireSupremeAdmin } from '../../../middlewares/supreme-admin.middleware';
import { asyncHandler } from '../../../utils/asyncHandler';

import { SupremeAdminController } from '../controllers/supreme-admin.controller';

const router = Router();

router.get(
  '/dashboard',
  authenticate,
  requireSupremeAdmin,
  asyncHandler(SupremeAdminController.getDashboard),
);

export default router;
