import { Router } from 'express';

import { authenticate } from '../../../middlewares/auth.middleware';
import { validate } from '../../../middlewares/validate.middleware';
import { asyncHandler } from '../../../utils/asyncHandler';

import { TaskColumnController } from '../controllers/task-column.controller';
import { createColumnSchema } from '../validators/create-column.validator';

const router = Router({
  mergeParams: true,
});

router.post(
  '/',
  authenticate,
  validate(createColumnSchema),
  asyncHandler(TaskColumnController.create),
);

export default router;
