import { Router } from 'express';

import { authenticate } from '../middlewares/auth.middleware';
import { asyncHandler } from '../utils/asyncHandler';

import { ProjectController } from '../modules/project/controllers/project.controller';
import { validate } from '../middlewares/validate.middleware';
import { updateProjectSchema } from '../modules/project/validators/update-project.validator';
import taskRoutes from '../modules/task/routes/task.routes';
import { TaskController } from '../modules/task/controllers/task.controller';
import { moveTaskSchema } from '../modules/task/validators/move-task.validator';
import boardRoutes from '../../src/modules/board/routes/board.routes';
import taskColumnRoutes from '../../src/modules/task-column/routes/task-column.routes';

const router = Router();
router.use('/:projectId/tasks', taskRoutes);
router.use('/:projectId/boards', boardRoutes);
router.use('/:projectId/columns', taskColumnRoutes);
router.get('/:projectId', authenticate, asyncHandler(ProjectController.getById));
router.patch(
  '/:projectId',
  authenticate,
  validate(updateProjectSchema),
  asyncHandler(ProjectController.update),
);

router.delete('/:projectId', authenticate, asyncHandler(ProjectController.delete));
router.patch(
  '/tasks/:taskId/move',
  authenticate,
  validate(moveTaskSchema),
  asyncHandler(TaskController.move),
);

export default router;
