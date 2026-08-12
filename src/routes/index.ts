import { Router } from 'express';
import authRoutes from '../modules/auth/routes/auth.routes';
import meRoutes from './me.routes';
import teamRoutes from '../modules/team/routes/team.routes';
import projectRoutes from './project.routes';
import dashboardRoutes from '../modules/dashboard/routes/dashboard.routes';
import boardRoutes from '../modules/board/routes/board.routes';
import taskRoutes from '../modules/task/routes/task.routes';
import supremeAdminRoutes from '../modules/supreme-admin/routes/supreme-admin.routes';

const router = Router();

router.use('/auth', authRoutes);
router.use(meRoutes);

router.use('/teams', teamRoutes);

router.use('/projects', projectRoutes);

router.use('/dashboard', dashboardRoutes);

router.use('/:projectId/board', boardRoutes);

router.use('/tasks', taskRoutes);

router.use('/api/v1/supreme-admin', supremeAdminRoutes);

export default router;
