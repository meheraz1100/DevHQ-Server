import { TaskPriority } from '@prisma/client';

export interface CreateTaskDto {
  title: string;
  description?: string;
  columnId: string;
  priority?: TaskPriority;
  dueDate?: Date;
  assigneeId?: string;
}
