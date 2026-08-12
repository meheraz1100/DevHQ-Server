import { Router } from 'express';

import { ProjectController } from '../controllers/project.controller';

import { authenticate } from '../../../middlewares/auth.middleware';
import { asyncHandler } from '../../../utils/asyncHandler';
import { validate } from '../../../middlewares/validate.middleware';

import { createProjectSchema } from '../validators/create-project.validator';
import boardRoutes from '../../board/routes/board.routes';
import taskColumnRoutes from '../../task-column/routes/task-column.routes';
import taskRoutes from '../../task/routes/task.routes';
const router = Router({ mergeParams: true });

router.get('/:id', authenticate, asyncHandler(ProjectController.getById));

router.post(
  '/',
  authenticate,
  validate(createProjectSchema),
  asyncHandler(ProjectController.create),
);
router.get('/', authenticate, asyncHandler(ProjectController.getTeamProjects));
router.use('/:projectId/board', boardRoutes);
router.use('/:projectId/columns', taskColumnRoutes);
router.use('/:projectId/tasks', taskRoutes);

export default router;
