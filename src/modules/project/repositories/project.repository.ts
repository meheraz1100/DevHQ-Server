import { prisma } from '../../../lib/prisma';
import { ProjectStatus } from '@prisma/client';
import { CreateProjectDto } from '../dto/create-project.dto';

export class ProjectRepository {
  static async findBySlug(slug: string) {
    return prisma.project.findUnique({
      where: {
        slug,
      },
    });
  }

  static async create(teamId: string, createdById: string, payload: CreateProjectDto) {
    return prisma.project.create({
      data: {
        name: payload.name,
        slug: payload.slug,
        description: payload.description,
        color: payload.color,
        teamId,
        createdById,

        columns: {
          create: [
            {
              name: 'Backlog',
              position: 1,
            },
            {
              name: 'Todo',
              position: 2,
            },
            {
              name: 'In Progress',
              position: 3,
            },
            {
              name: 'Review',
              position: 4,
            },
            {
              name: 'Done',
              position: 5,
            },
          ],
        },
      },

      include: {
        columns: {
          orderBy: {
            position: 'asc',
          },
        },
      },
    });
  }
  static async findByTeam(teamId: string) {
    return prisma.project.findMany({
      where: {
        teamId,
      },
      include: {
        createdBy: {
          select: {
            id: true,
            name: true,
            username: true,
            avatar: true,
          },
        },
        team: {
          select: {
            id: true,
            name: true,
            slug: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  static async update(
    projectId: string,
    payload: {
      name?: string;
      description?: string;
      color?: string;
      status?: ProjectStatus;
    },
  ) {
    return prisma.project.update({
      where: {
        id: projectId,
      },
      data: payload,
    });
  }

  static async delete(projectId: string) {
    return prisma.project.delete({
      where: {
        id: projectId,
      },
    });
  }

  static async findById(projectId: string) {
    return prisma.project.findUnique({
      where: {
        id: projectId,
      },

      include: {
        team: {
          select: {
            id: true,
            name: true,
            slug: true,
          },
        },

        columns: {
          orderBy: {
            position: 'asc',
          },

          include: {
            _count: {
              select: {
                tasks: true,
              },
            },
          },
        },

        _count: {
          select: {
            tasks: true,
          },
        },
      },
    });
  }
}
