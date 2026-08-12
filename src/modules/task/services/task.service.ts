import { TaskPriority } from '@prisma/client';

import { CreateTaskDto } from '../dto/create-task.dto';
import { TaskRepository } from '../repositories/task.repository';
import { UpdateTaskDto } from '../dto/update-task.dto';

export class TaskService {
  static async create(reporterId: string, projectId: string, payload: CreateTaskDto) {
    const last = await TaskRepository.getLastOrder(payload.columnId);

    const order = last ? last.order + 1 : 0;

    return TaskRepository.create({
      title: payload.title,
      description: payload.description,
      columnId: payload.columnId,
      projectId,
      reporterId,
      assigneeId: payload.assigneeId,
      priority: payload.priority ?? TaskPriority.MEDIUM,
      dueDate: payload.dueDate,
      order,
    });
  }

  static async move(taskId: string, columnId: string) {
    return TaskRepository.move(taskId, columnId);
  }

  static update(taskId: string, payload: UpdateTaskDto) {
    return TaskRepository.update(taskId, payload);
  }
  static async delete(taskId: string) {
    return TaskRepository.delete(taskId);
  }
}
