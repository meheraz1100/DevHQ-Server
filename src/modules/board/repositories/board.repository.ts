import { prisma } from '../../../lib/prisma';

export class BoardRepository {
  static async getBoard(projectId: string) {
    return prisma.project.findUnique({
      where: {
        id: projectId,
      },

      include: {
        columns: {
          orderBy: {
            position: 'asc',
          },

          include: {
            tasks: {
              orderBy: {
                order: 'asc',
              },

              include: {
                assignee: {
                  select: {
                    id: true,
                    name: true,
                    username: true,
                    avatar: true,
                  },
                },

                reporter: {
                  select: {
                    id: true,
                    name: true,
                    username: true,
                  },
                },
              },
            },
          },
        },
      },
    });
  }
}
