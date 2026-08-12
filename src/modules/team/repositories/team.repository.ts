import { TeamRole } from '@prisma/client';
import { prisma } from '../../../lib/prisma';
import { CreateTeamDto } from '../dto/create-team.dto';
import crypto from 'crypto';

export class TeamRepository {
  static async findBySlug(slug: string) {
    return prisma.team.findUnique({
      where: { slug },
    });
  }

  static async create(ownerId: string, payload: CreateTeamDto) {
    return prisma.team.create({
      data: {
        name: payload.name,
        slug: payload.slug,
        description: payload.description,
        ownerId,

        members: {
          create: {
            userId: ownerId,
            role: TeamRole.OWNER,
          },
        },
      },

      include: {
        owner: {
          select: {
            id: true,
            name: true,
            username: true,
            email: true,
          },
        },

        members: true,
      },
    });
  }

  static async findByUser(userId: string) {
    return prisma.team.findMany({
      where: {
        members: {
          some: {
            userId,
          },
        },
      },

      include: {
        owner: {
          select: {
            id: true,
            name: true,
            username: true,
            email: true,
          },
        },

        members: {
          where: {
            userId,
          },

          select: {
            role: true,
          },
        },

        _count: {
          select: {
            projects: true,
            members: true,
          },
        },
      },

      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  static async findBySlugWithMembers(slug: string) {
    return prisma.team.findUnique({
      where: {
        slug,
      },
      include: {
        owner: {
          select: {
            id: true,
            name: true,
            username: true,
            email: true,
          },
        },
        members: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                username: true,
                email: true,
                avatar: true,
              },
            },
          },
        },
      },
    });
  }

  static async update(
    id: string,
    payload: {
      name?: string;
      description?: string;
    },
  ) {
    return prisma.team.update({
      where: {
        id,
      },
      data: payload,
    });
  }

  static async delete(id: string) {
    return prisma.team.delete({
      where: {
        id,
      },
    });
  }

  static async findById(id: string) {
    return prisma.team.findUnique({
      where: {
        id,
      },
    });
  }
  static async findDetailsById(id: string) {
    return prisma.team.findUnique({
      where: {
        id,
      },

      include: {
        owner: {
          select: {
            id: true,
            name: true,
            username: true,
            email: true,
          },
        },

        members: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                username: true,
                email: true,
                avatar: true,
              },
            },
          },
        },

        projects: {
          orderBy: {
            createdAt: 'desc',
          },

          take: 5,

          select: {
            id: true,
            name: true,
            slug: true,
            color: true,
            createdAt: true,
          },
        },

        _count: {
          select: {
            members: true,
            projects: true,
          },
        },
      },
    });
  }
  static async createInvitation(data: {
    email: string;
    teamId: string;
    invitedById: string;
    role: TeamRole;
    expiresAt: Date;
  }) {
    const token = crypto.randomBytes(32).toString('hex');

    return prisma.teamInvitation.create({
      data: {
        ...data,
        token,
      },
    });
  }

  static async findMember(teamId: string, userId: string) {
    return prisma.teamMember.findUnique({
      where: {
        teamId_userId: {
          teamId,
          userId,
        },
      },
    });
  }

  static async findUserByEmail(email: string) {
    return prisma.user.findUnique({
      where: {
        email,
      },
    });
  }

  static async findPendingInvitation(teamId: string, email: string) {
    return prisma.teamInvitation.findFirst({
      where: {
        teamId,
        email,
        accepted: false,
      },
    });
  }

  static async findInvitationByToken(token: string) {
    return prisma.teamInvitation.findUnique({
      where: {
        token,
      },
    });
  }

  static async acceptInvitation(invitationId: string) {
    return prisma.teamInvitation.update({
      where: {
        id: invitationId,
      },
      data: {
        accepted: true,
      },
    });
  }

  static async addMember(teamId: string, userId: string, role: TeamRole) {
    return prisma.teamMember.create({
      data: {
        teamId,
        userId,
        role,
      },
    });
  }

  static async findMembership(teamId: string, userId: string) {
    return prisma.teamMember.findUnique({
      where: {
        teamId_userId: {
          teamId,
          userId,
        },
      },
    });
  }

  static async findUserByUsername(username: string) {
    return prisma.user.findUnique({
      where: {
        username,
      },
    });
  }
  static async getPendingInvitations(email: string) {
    return prisma.teamInvitation.findMany({
      where: {
        email,
        accepted: false,
        expiresAt: {
          gt: new Date(),
        },
      },

      include: {
        team: {
          select: {
            id: true,
            name: true,
            slug: true,
          },
        },

        invitedBy: {
          select: {
            id: true,
            name: true,
            username: true,
            avatar: true,
          },
        },
      },

      orderBy: {
        createdAt: 'desc',
      },
    });
  }
  static async deleteInvitation(id: string) {
    return prisma.teamInvitation.delete({
      where: {
        id,
      },
    });
  }
  static async findInvitationById(id: string) {
    return prisma.teamInvitation.findUnique({
      where: {
        id,
      },
    });
  }

  static async findMembersForAdmin(userId: string) {
    return prisma.teamMember.findMany({
      where: {
        team: {
          members: {
            some: {
              userId,
              role: {
                in: [TeamRole.ADMIN, TeamRole.OWNER],
              },
            },
          },
        },
      },

      select: {
        id: true,
        role: true,
        createdAt: true,

        user: {
          select: {
            id: true,
            name: true,
            username: true,
            email: true,
            avatar: true,
            isActive: true,
            isVerified: true,
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
}
