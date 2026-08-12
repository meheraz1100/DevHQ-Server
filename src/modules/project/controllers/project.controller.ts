import { Request, Response } from 'express';

import { sendResponse } from '../../../utils/sendResponse';
import { ProjectService } from '../services/project.service';

export class ProjectController {
  static async create(req: Request, res: Response) {
    const teamId = req.params.teamId as string;
    const project = await ProjectService.create(teamId, req.user!.userId, req.body);

    return sendResponse(res, {
      success: true,
      statusCode: 201,
      message: 'Project created successfully.',
      data: project,
    });
  }
  static async getTeamProjects(req: Request, res: Response) {
    const teamId = req.params.teamId as string;
    const projects = await ProjectService.getTeamProjects(teamId, req.user!.userId);

    return sendResponse(res, {
      success: true,
      statusCode: 200,
      message: 'Projects fetched successfully.',
      data: projects,
    });
  }

  static async update(req: Request, res: Response) {
    const projectId = req.params.projectId as string;
    const project = await ProjectService.update(projectId, req.user!.userId, req.body);

    return sendResponse(res, {
      success: true,
      statusCode: 200,
      message: 'Project updated successfully.',
      data: project,
    });
  }

  static async delete(req: Request, res: Response) {
    const projectId = req.params.projectId as string;
    await ProjectService.delete(projectId, req.user!.userId);

    return sendResponse(res, {
      success: true,
      statusCode: 200,
      message: 'Project deleted successfully.',
    });
  }

  static async getById(req: Request, res: Response) {
    const projectId = req.params.projectId as string;
    const project = await ProjectService.getById(projectId, req.user!.userId);

    return sendResponse(res, {
      success: true,
      statusCode: 200,
      message: 'Project fetched successfully.',
      data: project,
    });
  }
}
