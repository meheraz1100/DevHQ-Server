import { z } from 'zod';

export const createTeamSchema = z.object({
  name: z.string().trim().min(3, 'Team name must be at least 3 characters.').max(50),

  slug: z
    .string()
    .trim()
    .toLowerCase()
    .regex(/^[a-z0-9-]+$/, 'Slug can only contain lowercase letters, numbers and hyphens.'),

  description: z.string().trim().max(300).optional(),
});

export type CreateTeamInput = z.infer<typeof createTeamSchema>;
