import { Router } from 'express';

import { authenticate } from '../../../middlewares/auth.middleware';
import { validate } from '../../../middlewares/validate.middleware';
import { asyncHandler } from '../../../utils/asyncHandler';

import { TaskController } from '../controllers/task.controller';
import { createTaskSchema } from '../validators/create-task.validator';
import { moveTaskSchema } from '../validators/move-task.validator';
import { updateTaskSchema } from '../validators/update-task.validator';

const router = Router({
  mergeParams: true,
});

router.post('/', authenticate, validate(createTaskSchema), asyncHandler(TaskController.create));

router.patch(
  '/:taskId/move',
  authenticate,
  validate(moveTaskSchema),
  asyncHandler(TaskController.move),
);
router.patch(
  '/:taskId',
  authenticate,
  validate(updateTaskSchema),
  asyncHandler(TaskController.update),
);
router.delete('/:taskId', authenticate, asyncHandler(TaskController.delete));
export default router;
