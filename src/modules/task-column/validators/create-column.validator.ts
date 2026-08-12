import { z } from 'zod';

export const createColumnSchema = z.object({
  name: z.string().min(2).max(50),

  color: z.string().optional(),
});
