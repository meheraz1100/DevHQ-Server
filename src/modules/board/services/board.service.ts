import { AppError } from '../../../utils/AppError';

import { BoardRepository } from '../repositories/board.repository';

export class BoardService {
  static async getBoard(projectId: string, userId: string) {
    const board = await BoardRepository.getBoard(projectId);

    if (!board) {
      throw new AppError('Project not found', 404);
    }

    return board;
  }
}
