import { z } from 'zod';

export const createProjectSchema = z.object({
  name: z.string().trim().min(3).max(100),

  slug: z
    .string()
    .trim()
    .toLowerCase()
    .regex(/^[a-z0-9-]+$/),

  description: z.string().trim().max(500).optional(),

  color: z.string().trim().optional(),
});
