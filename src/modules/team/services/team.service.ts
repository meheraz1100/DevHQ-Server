import { AppError } from '../../../utils/AppError';
import { CreateTeamDto } from '../dto/create-team.dto';
import { TeamRepository } from '../repositories/team.repository';
import { prisma } from '../../../lib/prisma';
import { TeamRole } from '@prisma/client';
import { UserRepository } from '../../user/repositories/user.repository';

export class TeamService {
  static async create(ownerId: string, payload: CreateTeamDto) {
    const team = await TeamRepository.findBySlug(payload.slug);

    if (team) {
      throw new AppError('Team slug already exists.', 409);
    }

    return TeamRepository.create(ownerId, payload);
  }
  static async getMyTeams(ownerId: string) {
    return TeamRepository.findByUser(ownerId);
  }
  static async getBySlug(slug: string) {
    const team = await TeamRepository.findBySlugWithMembers(slug);

    if (!team) {
      throw new AppError('Team not found.', 404);
    }

    return team;
  }

  static async update(
    teamId: string,
    ownerId: string,
    payload: {
      name?: string;
      description?: string;
    },
  ) {
    const team = await TeamRepository.findById(teamId);

    if (!team) {
      throw new AppError('Team not found.', 404);
    }

    if (team.ownerId !== ownerId) {
      throw new AppError('Forbidden.', 403);
    }

    return TeamRepository.update(teamId, payload);
  }

  static async delete(teamId: string, ownerId: string) {
    const team = await TeamRepository.findById(teamId);

    if (!team) {
      throw new AppError('Team not found.', 404);
    }

    if (team.ownerId !== ownerId) {
      throw new AppError('Forbidden.', 403);
    }

    await TeamRepository.delete(teamId);
  }
  static async inviteMember(teamId: string, ownerId: string, username: string, role: TeamRole) {
    const team = await TeamRepository.findById(teamId);

    if (!team) {
      throw new AppError('Team not found.', 404);
    }

    const membership = await TeamRepository.findMembership(teamId, ownerId);

    if (!membership) {
      throw new AppError('You are not a member of this team.', 403);
    }

    if (membership.role !== TeamRole.OWNER && membership.role !== TeamRole.ADMIN) {
      throw new AppError('Only owners and admins can invite members.', 403);
    }

    const invitedUser = await TeamRepository.findUserByUsername(username);

    if (!invitedUser) {
      throw new AppError('User not found.', 404);
    }

    const member = await TeamRepository.findMember(teamId, invitedUser.id);

    if (member) {
      throw new AppError('User is already a team member.', 409);
    }

    const email = invitedUser.email;

    const pendingInvitation = await TeamRepository.findPendingInvitation(teamId, email);

    if (pendingInvitation) {
      throw new AppError('A pending invitation already exists.', 409);
    }

    const expiresAt = new Date();

    expiresAt.setDate(expiresAt.getDate() + 7);

    return TeamRepository.createInvitation({
      email,
      invitedById: ownerId,
      teamId,
      role,
      expiresAt,
    });
  }
  static async acceptInvitation(token: string, userId: string) {
    const invitation = await TeamRepository.findInvitationByToken(token);

    if (!invitation) {
      throw new AppError('Invitation not found.', 404);
    }

    if (invitation.accepted) {
      throw new AppError('Invitation already accepted.', 409);
    }

    if (invitation.expiresAt < new Date()) {
      throw new AppError('Invitation has expired.', 410);
    }

    const member = await TeamRepository.findMember(invitation.teamId, userId);

    if (member) {
      throw new AppError('You are already a member of this team.', 409);
    }

    await TeamRepository.addMember(invitation.teamId, userId, invitation.role);

    await TeamRepository.acceptInvitation(invitation.id);

    return {
      message: 'Invitation accepted successfully.',
    };
  }
  static async getById(id: string, userId: string) {
    const member = await TeamRepository.findMembership(id, userId);

    if (!member) {
      throw new AppError('Unauthorized.', 403);
    }

    const team = await TeamRepository.findDetailsById(id);

    if (!team) {
      throw new AppError('Team not found.', 404);
    }

    return team;
  }

  static async findUserByUsername(username: string) {
    return prisma.user.findUnique({
      where: {
        username,
      },
    });
  }
  static async getMyInvitations(userId: string) {
    const user = await UserRepository.findById(userId);

    if (!user) {
      throw new AppError('User not found.', 404);
    }

    return TeamRepository.getPendingInvitations(user.email);
  }

  static async declineInvitation(invitationId: string, userId: string) {
    const user = await UserRepository.findById(userId);

    if (!user) {
      throw new AppError('User not found.', 404);
    }

    const invitation = await TeamRepository.findInvitationById(invitationId);

    if (!invitation) {
      throw new AppError('Invitation not found.', 404);
    }

    if (invitation.email !== user.email) {
      throw new AppError('Forbidden.', 403);
    }

    await TeamRepository.deleteInvitation(invitation.id);

    return {
      message: 'Invitation declined successfully.',
    };
  }

  static async getMembersForAdmin(userId: string) {
    return TeamRepository.findMembersForAdmin(userId);
  }
}
