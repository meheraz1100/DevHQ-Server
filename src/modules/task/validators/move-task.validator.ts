import { z } from 'zod';

export const moveTaskSchema = z.object({
  body: z.object({
    columnId: z.string().min(1),
  }),
});
