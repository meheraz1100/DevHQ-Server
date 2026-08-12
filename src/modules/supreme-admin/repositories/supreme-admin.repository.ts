import { prisma } from '../../../lib/prisma';

export class SupremeAdminRepository {
  static async getDashboard() {
    const [totalUsers, activeUsers, totalTeams, totalProjects, totalTasks, users, teams] =
      await Promise.all([
        prisma.user.count(),

        prisma.user.count({
          where: {
            isActive: true,
          },
        }),

        prisma.team.count(),

        prisma.project.count(),

        prisma.task.count(),

        prisma.user.findMany({
          select: {
            id: true,
            name: true,
            username: true,
            email: true,
            avatar: true,
            role: true,
            isActive: true,
            isVerified: true,
            createdAt: true,

            memberships: {
              select: {
                role: true,

                team: {
                  select: {
                    id: true,
                    name: true,
                    slug: true,
                  },
                },
              },
            },
          },

          orderBy: {
            createdAt: 'desc',
          },
        }),

        prisma.team.findMany({
          select: {
            id: true,
            name: true,
            slug: true,
            createdAt: true,

            owner: {
              select: {
                id: true,
                name: true,
                username: true,
                email: true,
              },
            },

            _count: {
              select: {
                members: true,
                projects: true,
                invitations: true,
              },
            },
          },

          orderBy: {
            createdAt: 'desc',
          },
        }),
      ]);

    return {
      statistics: {
        totalUsers,
        activeUsers,
        inactiveUsers: totalUsers - activeUsers,
        totalTeams,
        totalProjects,
        totalTasks,
      },

      users,

      teams,
    };
  }
}
