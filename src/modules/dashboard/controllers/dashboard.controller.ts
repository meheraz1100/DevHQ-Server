import { Request, Response } from 'express';

import { DashboardService } from '../services/dashboard.service';
import { sendResponse } from '../../../utils/sendResponse';

export class DashboardController {
  static async getStatistics(req: Request, res: Response) {
    const dashboard = await DashboardService.getDashboard(req.user!.userId);

    return sendResponse(res, {
      success: true,
      statusCode: 200,
      message: 'Dashboard statistics fetched successfully.',
      data: dashboard,
    });
  }
}
