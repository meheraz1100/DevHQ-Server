import { Request, Response, NextFunction } from 'express';
import { prisma } from '../lib/prisma';

export async function requireSupremeAdmin(req: Request, res: Response, next: NextFunction) {
  try {
    const userId = req.user?.userId;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required.',
      });
    }

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        email: true,
        isActive: true,
      },
    });

    if (!user || !user.isActive) {
      return res.status(403).json({
        success: false,
        message: 'Access denied.',
      });
    }

    if (user.email.toLowerCase() !== process.env.SUPREME_ADMIN_EMAIL?.toLowerCase()) {
      return res.status(403).json({
        success: false,
        message: 'Supreme Admin access required.',
      });
    }

    next();
  } catch (error) {
    next(error);
  }
}
