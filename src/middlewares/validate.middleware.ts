import { NextFunction, Request, Response } from 'express';
import { z } from 'zod';

export const validate =
  (schema: z.ZodSchema) => (req: Request, _res: Response, next: NextFunction) => {
    schema.parse(req.body);

    next();
  };
