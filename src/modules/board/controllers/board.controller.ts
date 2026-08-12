import { Request, Response } from 'express';

import { sendResponse } from '../../../utils/sendResponse';

import { BoardService } from '../services/board.service';

export class BoardController {
  static async getBoard(req: Request, res: Response) {
    const projectId = req.params.projectId as string;

    const board = await BoardService.getBoard(projectId, req.user!.userId);

    return sendResponse(res, {
      success: true,
      statusCode: 200,
      message: 'Board fetched successfully.',
      data: board,
    });
  }
}
