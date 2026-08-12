import { prisma } from '../../../lib/prisma';

export class UserRepository {
  static async findById(id: string) {
    return prisma.user.findUnique({
      where: {
        id,
      },
    });
  }
}
