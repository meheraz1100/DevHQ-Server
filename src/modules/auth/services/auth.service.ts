import bcrypt from 'bcrypt';
import { prisma } from '../../../lib/prisma';
import { RegisterDto } from '../dto/register.dto';
import { AppError } from '../../../utils/AppError';
import { LoginDto } from '../dto/login.dto';
import { generateAccessToken, generateRefreshToken } from '../../../utils/jwt';

export class AuthService {
  static async login(payload: LoginDto) {
    const user = await prisma.user.findUnique({
      where: {
        email: payload.email,
      },
    });

    if (!user) {
      throw new AppError('Invalid email or password.', 401);
    }

    const isPasswordMatched = await bcrypt.compare(payload.password, user.password);

    if (!isPasswordMatched) {
      throw new AppError('Invalid email or password.', 401);
    }

    const accessToken = generateAccessToken({
      userId: user.id,
      role: user.role,
    });

    const refreshToken = generateRefreshToken({
      userId: user.id,
      role: user.role,
    });

    return {
      user: {
        id: user.id,
        name: user.name,
        username: user.username,
        email: user.email,
        role: user.role,
      },
      accessToken,
      refreshToken,
    };
  }

  static async register(payload: RegisterDto) {
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ email: payload.email }, { username: payload.username }],
      },
    });

    if (existingUser) {
      throw new AppError('Email or username already exists.', 409);
    }

    const hashedPassword = await bcrypt.hash(payload.password, 12);

    const user = await prisma.user.create({
      data: {
        name: payload.name,
        username: payload.username,
        email: payload.email,
        password: hashedPassword,
      },
      select: {
        id: true,
        name: true,
        username: true,
        email: true,
        role: true,
        createdAt: true,
      },
    });

    return user;
  }
}
