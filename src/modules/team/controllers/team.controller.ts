import { Request, Response } from 'express';

import { sendResponse } from '../../../utils/sendResponse';
import { TeamService } from '../services/team.service';

export class TeamController {
  static async create(req: Request, res: Response) {
    const ownerId = req.user!.userId;

    const team = await TeamService.create(ownerId, req.body);

    return sendResponse(res, {
      success: true,
      statusCode: 201,
      message: 'Team created successfully.',
      data: team,
    });
  }

  static async getMyTeams(req: Request, res: Response) {
    const ownerId = req.user!.userId;

    const teams = await TeamService.getMyTeams(ownerId);

    return sendResponse(res, {
      success: true,
      statusCode: 200,
      message: 'Teams fetched successfully.',
      data: teams,
    });
  }
  static async getBySlug(req: Request, res: Response) {
    const slug = req.params.slug as string;
    const team = await TeamService.getBySlug(slug);

    return sendResponse(res, {
      success: true,
      statusCode: 200,
      message: 'Team fetched successfully.',
      data: team,
    });
  }

  static async update(req: Request, res: Response) {
    const id = req.params.id as string;
    const team = await TeamService.update(id, req.user!.userId, req.body);

    return sendResponse(res, {
      success: true,
      statusCode: 200,
      message: 'Team updated successfully.',
      data: team,
    });
  }

  static async delete(req: Request, res: Response) {
    const id = req.params.id as string;
    await TeamService.delete(id, req.user!.userId);

    return sendResponse(res, {
      success: true,
      statusCode: 200,
      message: 'Team deleted successfully.',
    });
  }

  static async inviteMember(req: Request, res: Response) {
    const { username, role } = req.body;

    const teamId = req.params.id as string;

    const invitation = await TeamService.inviteMember(teamId, req.user!.userId, username, role);

    return sendResponse(res, {
      success: true,
      statusCode: 201,
      message: 'Invitation created successfully.',
      data: invitation,
    });
  }

  static async acceptInvitation(req: Request, res: Response) {
    const result = await TeamService.acceptInvitation(req.body.token, req.user!.userId);

    return sendResponse(res, {
      success: true,
      statusCode: 200,
      message: result.message,
    });
  }
  static async getById(req: Request, res: Response) {
    const id = req.params.id as string;
    const team = await TeamService.getById(id, req.user!.userId);

    return sendResponse(res, {
      success: true,
      statusCode: 200,
      message: 'Team fetched successfully.',
      data: team,
    });
  }
  static async getMyInvitations(req: Request, res: Response) {
    const invitations = await TeamService.getMyInvitations(req.user!.userId);

    return sendResponse(res, {
      success: true,
      statusCode: 200,
      message: 'Invitations fetched successfully.',
      data: invitations,
    });
  }

  static async declineInvitation(req: Request, res: Response) {
    const id = req.params.id as string;
    const result = await TeamService.declineInvitation(id, req.user!.userId);

    return sendResponse(res, {
      success: true,
      statusCode: 200,
      message: result.message,
    });
  }

  static async getMembersForAdmin(req: Request, res: Response) {
    const members = await TeamService.getMembersForAdmin(req.user!.userId);

    return sendResponse(res, {
      success: true,
      statusCode: 200,
      message: 'Admin team members fetched successfully.',
      data: members,
    });
  }
}
