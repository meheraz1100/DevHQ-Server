import { z } from 'zod';

export const registerSchema = z.object({
  name: z.string().trim().min(3, 'Name must be at least 3 characters.').max(100),

  username: z
    .string()
    .trim()
    .min(3)
    .max(30)
    .regex(/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers and underscore.'),

  email: z.string().email(),

  password: z.string().min(8).max(100),
});

export type RegisterInput = z.infer<typeof registerSchema>;
