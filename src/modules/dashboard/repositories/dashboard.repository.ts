import { prisma } from '../../../lib/prisma';

export class DashboardRepository {
  static async getStatistics(userId: string) {
    const [totalTeams, totalProjects, totalTasks, completedTasks, pendingTasks, overdueTasks] =
      await Promise.all([
        prisma.teamMember.count({
          where: {
            userId,
          },
        }),

        prisma.project.count({
          where: {
            team: {
              members: {
                some: {
                  userId,
                },
              },
            },
          },
        }),

        prisma.task.count({
          where: {
            project: {
              team: {
                members: {
                  some: {
                    userId,
                  },
                },
              },
            },
          },
        }),

        prisma.task.count({
          where: {
            column: {
              name: {
                equals: 'Done',
                mode: 'insensitive',
              },
            },

            project: {
              team: {
                members: {
                  some: {
                    userId,
                  },
                },
              },
            },
          },
        }),

        prisma.task.count({
          where: {
            NOT: {
              column: {
                name: {
                  equals: 'Done',
                  mode: 'insensitive',
                },
              },
            },

            project: {
              team: {
                members: {
                  some: {
                    userId,
                  },
                },
              },
            },
          },
        }),

        prisma.task.count({
          where: {
            dueDate: {
              lt: new Date(),
            },

            NOT: {
              column: {
                name: {
                  equals: 'Done',
                  mode: 'insensitive',
                },
              },
            },

            project: {
              team: {
                members: {
                  some: {
                    userId,
                  },
                },
              },
            },
          },
        }),
      ]);

    return {
      totalTeams,
      totalProjects,
      totalTasks,
      completedTasks,
      pendingTasks,
      overdueTasks,
    };
  }
  static async getRecentTeams(userId: string) {
    return prisma.team.findMany({
      where: {
        members: {
          some: {
            userId,
          },
        },
      },

      include: {
        _count: {
          select: {
            members: true,
            projects: true,
          },
        },
      },

      orderBy: {
        createdAt: 'desc',
      },

      take: 5,
    });
  }

  static async getRecentProjects(userId: string) {
    return prisma.project.findMany({
      where: {
        team: {
          members: {
            some: {
              userId,
            },
          },
        },
      },

      include: {
        team: {
          select: {
            id: true,
            name: true,
          },
        },

        _count: {
          select: {
            tasks: true,
          },
        },
      },

      orderBy: {
        createdAt: 'desc',
      },

      take: 5,
    });
  }
}
