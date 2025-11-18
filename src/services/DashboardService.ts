import { query } from '../config/database';
import { DashboardKPIs, CategoryBreakdown, TimelineDeadline } from '../types';

export class DashboardService {
  /**
   * Get all dashboard KPIs
   */
  static async getKPIs(): Promise<DashboardKPIs> {
    const [
      totalGrants,
      activeGrants,
      totalFunding,
      applicationsSubmitted,
      successRateAvg,
      categoriesBreakdown,
      countriesBreakdown,
      deadlinesThisMonth,
      topCategories,
      timelineDeadlines,
    ] = await Promise.all([
      this.getTotalGrants(),
      this.getActiveGrants(),
      this.getTotalFunding(),
      this.getApplicationsSubmitted(),
      this.getAverageSuccessRate(),
      this.getCategoriesBreakdown(),
      this.getCountriesBreakdown(),
      this.getDeadlinesThisMonth(),
      this.getTopCategories(),
      this.getTimelineData(),
    ]);

    return {
      total_grants: totalGrants,
      active_grants: activeGrants,
      total_funding_eur: totalFunding,
      applications_submitted: applicationsSubmitted,
      success_rate_avg: successRateAvg,
      categories_breakdown: categoriesBreakdown,
      countries_breakdown: countriesBreakdown,
      deadlines_this_month: deadlinesThisMonth,
      top_categories: topCategories,
      timeline_deadlines: timelineDeadlines,
    };
  }

  /**
   * Get total number of grants
   */
  private static async getTotalGrants(): Promise<number> {
    const result = await query('SELECT COUNT(*) as count FROM grants');
    return parseInt(result.rows[0].count);
  }

  /**
   * Get number of active grants
   */
  private static async getActiveGrants(): Promise<number> {
    const queryText = `
      SELECT COUNT(*) as count
      FROM grants g
      JOIN statuses s ON g.status_id = s.id
      WHERE s.name = 'Aktywny'
    `;
    const result = await query(queryText);
    return parseInt(result.rows[0].count);
  }

  /**
   * Get total funding available in EUR
   */
  private static async getTotalFunding(): Promise<number> {
    const queryText = `
      SELECT SUM(amount_max) as total
      FROM grants
      WHERE currency = 'EUR'
    `;
    const result = await query(queryText);
    return parseFloat(result.rows[0].total || '0');
  }

  /**
   * Get number of submitted applications
   */
  private static async getApplicationsSubmitted(): Promise<number> {
    const queryText = `
      SELECT COUNT(*) as count
      FROM applications
      WHERE status IN ('Złożona', 'W ocenie', 'Zatwierdzona', 'Odrzucona')
    `;
    const result = await query(queryText);
    return parseInt(result.rows[0].count);
  }

  /**
   * Get average success rate across all grants
   */
  private static async getAverageSuccessRate(): Promise<number> {
    const queryText = `
      SELECT AVG(success_rate) as avg_rate
      FROM grants
      WHERE success_rate > 0
    `;
    const result = await query(queryText);
    return Math.round(parseFloat(result.rows[0].avg_rate || '0'));
  }

  /**
   * Get grants breakdown by categories
   */
  static async getCategoriesBreakdown(): Promise<Record<string, number>> {
    const queryText = `
      SELECT c.name, COUNT(*) as count
      FROM grants g
      JOIN categories c ON g.category_id = c.id
      GROUP BY c.name
      ORDER BY count DESC
    `;
    const result = await query(queryText);

    const breakdown: Record<string, number> = {};
    result.rows.forEach(row => {
      breakdown[row.name] = parseInt(row.count);
    });

    return breakdown;
  }

  /**
   * Get grants breakdown by countries (based on partners)
   */
  static async getCountriesBreakdown(): Promise<Record<string, number>> {
    const queryText = `
      SELECT country, COUNT(*) as count
      FROM partners
      GROUP BY country
      ORDER BY count DESC
    `;
    const result = await query(queryText);

    const breakdown: Record<string, number> = {};
    result.rows.forEach(row => {
      breakdown[row.country] = parseInt(row.count);
    });

    return breakdown;
  }

  /**
   * Get number of deadlines this month
   */
  static async getDeadlinesThisMonth(): Promise<number> {
    const queryText = `
      SELECT COUNT(*) as count
      FROM grants g
      JOIN statuses s ON g.status_id = s.id
      WHERE s.name = 'Aktywny'
      AND g.deadline >= DATE_TRUNC('month', CURRENT_DATE)
      AND g.deadline < DATE_TRUNC('month', CURRENT_DATE) + INTERVAL '1 month'
    `;
    const result = await query(queryText);
    return parseInt(result.rows[0].count);
  }

  /**
   * Get top categories by count and success rate
   */
  static async getTopCategories(limit: number = 5): Promise<CategoryBreakdown[]> {
    const queryText = `
      SELECT
        c.name,
        COUNT(*) as count,
        COALESCE(AVG(g.success_rate), 0) as success_rate
      FROM grants g
      JOIN categories c ON g.category_id = c.id
      GROUP BY c.name
      ORDER BY count DESC, success_rate DESC
      LIMIT $1
    `;
    const result = await query(queryText, [limit]);

    return result.rows.map(row => ({
      name: row.name,
      count: parseInt(row.count),
      success_rate: Math.round(parseFloat(row.success_rate)),
    }));
  }

  /**
   * Get timeline data for upcoming deadlines
   */
  static async getTimelineData(months: number = 6): Promise<TimelineDeadline[]> {
    const queryText = `
      SELECT
        DATE_TRUNC('month', g.deadline) as month,
        COUNT(*) as grants_count,
        SUM(g.amount_max) as total_amount
      FROM grants g
      JOIN statuses s ON g.status_id = s.id
      WHERE s.name = 'Aktywny'
      AND g.deadline >= CURRENT_DATE
      AND g.deadline < CURRENT_DATE + INTERVAL '${months} months'
      GROUP BY DATE_TRUNC('month', g.deadline)
      ORDER BY month ASC
    `;
    const result = await query(queryText);

    return result.rows.map(row => ({
      date: new Date(row.month).toISOString().split('T')[0],
      grants_count: parseInt(row.grants_count),
      total_amount: parseFloat(row.total_amount || '0'),
    }));
  }

  /**
   * Get success rate by category
   */
  static async getSuccessRateByCategory(): Promise<Record<string, number>> {
    const queryText = `
      SELECT
        c.name,
        COALESCE(AVG(g.success_rate), 0) as avg_success_rate
      FROM grants g
      JOIN categories c ON g.category_id = c.id
      GROUP BY c.name
      ORDER BY avg_success_rate DESC
    `;
    const result = await query(queryText);

    const breakdown: Record<string, number> = {};
    result.rows.forEach(row => {
      breakdown[row.name] = Math.round(parseFloat(row.avg_success_rate));
    });

    return breakdown;
  }

  /**
   * Get recent activity summary
   */
  static async getRecentActivity(days: number = 7) {
    const queryText = `
      SELECT
        COUNT(DISTINCT g.id) as new_grants,
        COUNT(DISTINCT a.id) as new_applications,
        COUNT(DISTINCT p.id) as new_partners
      FROM grants g
      FULL OUTER JOIN applications a ON a.created_at >= CURRENT_DATE - INTERVAL '${days} days'
      FULL OUTER JOIN partners p ON p.created_at >= CURRENT_DATE - INTERVAL '${days} days'
      WHERE g.created_at >= CURRENT_DATE - INTERVAL '${days} days'
    `;
    const result = await query(queryText);
    return result.rows[0];
  }

  /**
   * Get user-specific dashboard data
   */
  static async getUserDashboard(userId: string) {
    const queryText = `
      SELECT
        COUNT(*) FILTER (WHERE status = 'Szkic') as drafts,
        COUNT(*) FILTER (WHERE status = 'Złożona') as submitted,
        COUNT(*) FILTER (WHERE status = 'W ocenie') as in_review,
        COUNT(*) FILTER (WHERE status = 'Zatwierdzona') as approved,
        COUNT(*) FILTER (WHERE status = 'Odrzucona') as rejected,
        AVG(progress) as avg_progress
      FROM applications
      WHERE user_id = $1
    `;
    const result = await query(queryText, [userId]);

    return {
      ...result.rows[0],
      avg_progress: Math.round(parseFloat(result.rows[0].avg_progress || '0')),
    };
  }
}
