import { AppError } from '../../../utils/AppError';
import { TeamRepository } from '../../team/repositories/team.repository';
import { ProjectRepository } from '../repositories/project.repository';
import { CreateProjectDto } from '../dto/create-project.dto';
import { TeamPermissionService } from '../../team/services/team-permission.service';
import { ProjectStatus, TeamRole } from '@prisma/client';
import { prisma } from '../../../lib/prisma';

export class ProjectService {
  static async create(teamId: string, userId: string, payload: CreateProjectDto) {
    const team = await TeamRepository.findById(teamId);

    if (!team) {
      throw new AppError('Team not found.', 404);
    }

    await TeamPermissionService.requireRole(teamId, userId, [TeamRole.OWNER, TeamRole.ADMIN]);

    const existingProject = await ProjectRepository.findBySlug(payload.slug);

    if (existingProject) {
      throw new AppError('Project slug already exists.', 409);
    }

    return ProjectRepository.create(teamId, userId, payload);
  }
  static async getTeamProjects(teamId: string, userId: string) {
    const team = await TeamRepository.findById(teamId);

    if (!team) {
      throw new AppError('Team not found.', 404);
    }

    await TeamPermissionService.requireRole(teamId, userId, [
      TeamRole.OWNER,
      TeamRole.ADMIN,
      TeamRole.MEMBER,
    ]);

    return ProjectRepository.findByTeam(teamId);
  }

  static async update(
    projectId: string,
    userId: string,
    payload: {
      name?: string;
      description?: string;
      color?: string;
      status?: ProjectStatus;
    },
  ) {
    const project = await ProjectRepository.findById(projectId);

    if (!project) {
      throw new AppError('Project not found.', 404);
    }

    await TeamPermissionService.requireRole(project.teamId, userId, [
      TeamRole.OWNER,
      TeamRole.ADMIN,
    ]);

    return ProjectRepository.update(projectId, payload);
  }

  static async delete(projectId: string, userId: string) {
    const project = await ProjectRepository.findById(projectId);

    if (!project) {
      throw new AppError('Project not found.', 404);
    }

    await TeamPermissionService.requireRole(project.teamId, userId, [
      TeamRole.OWNER,
      TeamRole.ADMIN,
    ]);

    await ProjectRepository.delete(projectId);
  }

  static async getById(projectId: string, userId: string) {
    const project = await ProjectRepository.findById(projectId);

    if (!project) {
      throw new AppError('Project not found.', 404);
    }

    const member = await prisma.teamMember.findUnique({
      where: {
        teamId_userId: {
          teamId: project.teamId,
          userId,
        },
      },
    });

    if (!member) {
      throw new AppError('Unauthorized.', 403);
    }

    return project;
  }
}
