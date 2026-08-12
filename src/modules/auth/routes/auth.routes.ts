import { Router } from 'express';

import { AuthController } from '../controllers/auth.controller';

import { asyncHandler } from '../../../utils/asyncHandler';
import { validate } from '../../../middlewares/validate.middleware';

import { registerSchema } from '../validators/register.validator';
import { loginSchema } from '../validators/login.validator';

const router = Router();

router.post('/register', validate(registerSchema), asyncHandler(AuthController.register));

router.post('/login', validate(loginSchema), asyncHandler(AuthController.login));

router.post('/refresh', asyncHandler(AuthController.refresh));

router.post('/logout', asyncHandler(AuthController.logout));

export default router;
