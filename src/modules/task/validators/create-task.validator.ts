import { z } from 'zod';

export const createTaskSchema = z.object({
  body: z.object({
    title: z.string().min(2).max(100),

    description: z.string().optional(),

    columnId: z.string(),

    priority: z.enum(['LOW', 'MEDIUM', 'HIGH', 'URGENT']).optional(),

    dueDate: z.string().optional(),

    assigneeId: z.string().optional(),
  }),
});
