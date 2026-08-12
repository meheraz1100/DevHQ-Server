import { ProjectStatus } from '@prisma/client';
import { z } from 'zod';

export const updateProjectSchema = z.object({
  name: z.string().min(3).max(100).optional(),

  description: z.string().max(500).optional(),

  color: z.string().optional(),

  status: z.nativeEnum(ProjectStatus).optional(),
});
