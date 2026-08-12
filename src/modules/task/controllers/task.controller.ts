import { Request, Response } from 'express';
import { sendResponse } from '../../../utils/sendResponse';

import { TaskService } from '../services/task.service';

export class TaskController {
  static async create(req: Request, res: Response) {
    const projectId = req.params.projectId as string;

    const task = await TaskService.create(req.user!.userId, projectId, req.body);

    return sendResponse(res, {
      success: true,
      statusCode: 201,
      message: 'Task created successfully',
      data: task,
    });
  }

  static async move(req: Request, res: Response) {
    const taskId = req.params.taskId as string;
    const { columnId } = req.body;

    const task = await TaskService.move(taskId, columnId);

    return sendResponse(res, {
      success: true,
      statusCode: 200,
      message: 'Task moved successfully',
      data: task,
    });
  }

  static async update(req: Request, res: Response) {
    const taskId = req.params.taskId as string;

    const task = await TaskService.update(taskId, req.body);

    return sendResponse(res, {
      success: true,
      statusCode: 200,
      message: 'Task updated successfully',
      data: task,
    });
  }

  static async delete(req: Request, res: Response) {
    const taskId = req.params.taskId as string;

    await TaskService.delete(taskId);

    return sendResponse(res, {
      success: true,
      statusCode: 200,
      message: 'Task deleted successfully',
      data: null,
    });
  }
}
