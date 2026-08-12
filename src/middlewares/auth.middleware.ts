import { NextFunction, Request, Response } from 'express';
import { verifyAccessToken } from '../utils/jwt';
import { AppError } from '../utils/AppError';
import { UserRole } from '@prisma/client';

export function authenticate(req: Request, _res: Response, next: NextFunction) {
  const authorization = req.headers.authorization;

  if (!authorization) {
    return next(new AppError('Unauthorized.', 401));
  }

  const token = authorization.startsWith('Bearer ') ? authorization.split(' ')[1] : authorization;

  try {
    const decoded = verifyAccessToken(token);

    req.user = {
      userId: decoded.userId,
      role: decoded.role as UserRole,
    };

    next();
  } catch {
    next(new AppError('Invalid or expired token.', 401));
  }
}
