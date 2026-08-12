import { TeamRole } from '@prisma/client';

import { AppError } from '../../../utils/AppError';
import { TeamRepository } from '../repositories/team.repository';

export class TeamPermissionService {
  static async requireRole(teamId: string, userId: string, roles: TeamRole[]) {
    const membership = await TeamRepository.findMembership(teamId, userId);

    if (!membership) {
      throw new AppError('You are not a member of this team.', 403);
    }

    if (!roles.includes(membership.role)) {
      throw new AppError('You do not have permission to perform this action.', 403);
    }

    return membership;
  }
}
