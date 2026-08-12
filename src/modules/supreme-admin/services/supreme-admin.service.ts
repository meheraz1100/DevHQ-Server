import { SupremeAdminRepository } from '../repositories/supreme-admin.repository';

export class SupremeAdminService {
  static async getDashboard() {
    return SupremeAdminRepository.getDashboard();
  }
}
