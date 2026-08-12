import { Router } from 'express';

import { BoardController } from '../controllers/board.controller';

import { authenticate } from '../../../middlewares/auth.middleware';
import { asyncHandler } from '../../../utils/asyncHandler';

const router = Router({ mergeParams: true });

router.get('/', authenticate, asyncHandler(BoardController.getBoard));

export default router;
