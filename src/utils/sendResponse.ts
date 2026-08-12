import { Response } from 'express';

interface SendResponse<T> {
  success: boolean;
  statusCode: number;
  message: string;
  data?: T;
}

export function sendResponse<T>(res: Response, payload: SendResponse<T>): Response {
  const { success, statusCode, message, data } = payload;

  return res.status(statusCode).json({
    success,
    message,
    data,
  });
}
