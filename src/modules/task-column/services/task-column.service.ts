import { CreateColumnDto } from '../dto/create-column.dto';
import { TaskColumnRepository } from '../repositories/task-column.repository';

export class TaskColumnService {
  static async create(projectId: string, payload: CreateColumnDto) {
    const last = await TaskColumnRepository.getLastPosition(projectId);

    const position = last ? last.position + 1 : 0;

    return TaskColumnRepository.create({
      projectId,
      position,
      name: payload.name,
      color: payload.color,
    });
  }
}
