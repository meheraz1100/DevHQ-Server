import { Request, Response } from 'express';

import { sendResponse } from '../../../utils/sendResponse';

import { SupremeAdminService } from '../services/supreme-admin.service';

export class SupremeAdminController {
  static async getDashboard(req: Request, res: Response) {
    const dashboard = await SupremeAdminService.getDashboard();

    return sendResponse(res, {
      success: true,
      statusCode: 200,
      message: 'Supreme Admin dashboard fetched successfully.',
      data: dashboard,
    });
  }
}
