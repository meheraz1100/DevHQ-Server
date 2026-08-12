import { Request, Response } from 'express';

import { AppError } from '../../../utils/AppError';
import { generateAccessToken, verifyRefreshToken } from '../../../utils/jwt';
import { sendResponse } from '../../../utils/sendResponse';

import { AuthService } from '../services/auth.service';

export class AuthController {
  static async register(req: Request, res: Response) {
    const user = await AuthService.register(req.body);

    return sendResponse(res, {
      success: true,
      statusCode: 201,
      message: 'User registered successfully.',
      data: user,
    });
  }

  static async login(req: Request, res: Response) {
    const result = await AuthService.login(req.body);

    res.cookie('refreshToken', result.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return sendResponse(res, {
      success: true,
      statusCode: 200,
      message: 'Login successful.',
      data: {
        user: result.user,
        accessToken: result.accessToken,
      },
    });
  }

  static async refresh(req: Request, res: Response) {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      throw new AppError('Refresh token not found.', 401);
    }

    const payload = verifyRefreshToken(refreshToken);

    const accessToken = generateAccessToken({
      userId: payload.userId,
      role: payload.role,
    });

    return sendResponse(res, {
      success: true,
      statusCode: 200,
      message: 'Access token refreshed.',
      data: {
        accessToken,
      },
    });
  }

  static async logout(_req: Request, res: Response) {
    res.clearCookie('refreshToken', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
    });

    return res.status(200).json({
      success: true,
      message: 'Logged out successfully.',
    });
  }
}
