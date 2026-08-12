import { prisma } from '../../../lib/prisma';
import { Prisma, TaskPriority } from '@prisma/client';

export class TaskRepository {
  static async getLastOrder(columnId: string) {
    return prisma.task.findFirst({
      where: {
        columnId,
      },

      orderBy: {
        order: 'desc',
      },
    });
  }

  static async move(taskId: string, columnId: string) {
    const last = await prisma.task.findFirst({
      where: {
        columnId,
      },
      orderBy: {
        order: 'desc',
      },
    });

    return prisma.task.update({
      where: {
        id: taskId,
      },
      data: {
        columnId,
        order: last ? last.order + 1 : 0,
      },
    });
  }

  static async create(data: {
    title: string;
    description?: string;
    columnId: string;
    projectId: string;
    reporterId: string;
    assigneeId?: string;
    priority: TaskPriority;
    dueDate?: Date;
    order: number;
  }) {
    return prisma.task.create({
      data,
    });
  }

  static update(taskId: string, data: Prisma.TaskUpdateInput) {
    return prisma.task.update({
      where: {
        id: taskId,
      },
      data,
    });
  }
  static async delete(taskId: string) {
    return prisma.task.delete({
      where: {
        id: taskId,
      },
    });
  }
}
