import { prisma } from '../../../lib/prisma';

export class TaskColumnRepository {
  static async getLastPosition(projectId: string) {
    return prisma.taskColumn.findFirst({
      where: {
        projectId,
      },

      orderBy: {
        position: 'desc',
      },
    });
  }

  static async create(data: { projectId: string; name: string; color?: string; position: number }) {
    return prisma.taskColumn.create({
      data,
    });
  }
}
