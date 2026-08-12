import { Request, Response } from 'express';

import { TaskColumnService } from '../services/task-column.service';

export class TaskColumnController {
  static async create(req: Request, res: Response) {
    const projectId = req.params.projectId as string;

    console.log('Creating column for projectId:', projectId);

    const column = await TaskColumnService.create(projectId, req.body);

    res.json({
      success: true,
      data: column,
    });
  }
}
