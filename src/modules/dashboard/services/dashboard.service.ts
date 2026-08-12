import { DashboardRepository } from '../repositories/dashboard.repository';

export class DashboardService {
  static async getDashboard(userId: string) {
    const [statistics, recentTeams, recentProjects] = await Promise.all([
      DashboardRepository.getStatistics(userId),

      DashboardRepository.getRecentTeams(userId),

      DashboardRepository.getRecentProjects(userId),
    ]);

    return {
      statistics,
      recentTeams,
      recentProjects,
    };
  }
}
