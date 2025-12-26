import pool, { query } from '../config/database';
import { Grant, GrantWithDetails, GrantFilters, CreateGrantRequest } from '../types';

export class GrantService {
  /**
   * Get active grants with optional filters
   */
  static async getActiveGrants(filters: GrantFilters = {}): Promise<GrantWithDetails[]> {
    let queryText = `
      SELECT
        g.*,
        s.name as status_name,
        c.name as category_name,
        c.icon as category_icon,
        c.description as category_description
      FROM grants g
      JOIN statuses s ON g.status_id = s.id
      JOIN categories c ON g.category_id = c.id
      WHERE 1=1
    `;
    const params: any[] = [];
    let paramIndex = 1;

    // Filter by status
    if (filters.status) {
      queryText += ` AND s.name = $${paramIndex}`;
      params.push(filters.status);
      paramIndex++;
    }

    // Filter by category
    if (filters.category) {
      queryText += ` AND c.name ILIKE $${paramIndex}`;
      params.push(`%${filters.category}%`);
      paramIndex++;
    }

    // Filter by deadline range
    if (filters.deadline_from) {
      queryText += ` AND g.deadline >= $${paramIndex}`;
      params.push(filters.deadline_from);
      paramIndex++;
    }

    if (filters.deadline_to) {
      queryText += ` AND g.deadline <= $${paramIndex}`;
      params.push(filters.deadline_to);
      paramIndex++;
    }

    // Search in grant name or description
    if (filters.search) {
      queryText += ` AND (g.name ILIKE $${paramIndex} OR g.description ILIKE $${paramIndex})`;
      params.push(`%${filters.search}%`);
      paramIndex++;
    }

    queryText += ` ORDER BY g.deadline ASC, g.created_at DESC`;

    const result = await query(queryText, params);

    return result.rows.map(row => ({
      id: row.id,
      name: row.name,
      status_id: row.status_id,
      category_id: row.category_id,
      amount_min: parseFloat(row.amount_min),
      amount_max: parseFloat(row.amount_max),
      currency: row.currency,
      deadline: row.deadline,
      progress: row.progress,
      success_rate: row.success_rate,
      description: row.description,
      requirements: row.requirements || [],
      apply_link: row.apply_link,
      created_at: row.created_at,
      updated_at: row.updated_at,
      status: {
        id: row.status_id,
        name: row.status_name,
      },
      category: {
        id: row.category_id,
        name: row.category_name,
        icon: row.category_icon,
        description: row.category_description,
      },
    }));
  }

  /**
   * Get grant details by ID
   */
  static async getGrantDetails(id: string): Promise<GrantWithDetails | null> {
    const queryText = `
      SELECT
        g.*,
        s.name as status_name,
        c.name as category_name,
        c.icon as category_icon,
        c.description as category_description
      FROM grants g
      JOIN statuses s ON g.status_id = s.id
      JOIN categories c ON g.category_id = c.id
      WHERE g.id = $1
    `;

    const result = await query(queryText, [id]);

    if (result.rows.length === 0) {
      return null;
    }

    const row = result.rows[0];

    return {
      id: row.id,
      name: row.name,
      status_id: row.status_id,
      category_id: row.category_id,
      amount_min: parseFloat(row.amount_min),
      amount_max: parseFloat(row.amount_max),
      currency: row.currency,
      deadline: row.deadline,
      progress: row.progress,
      success_rate: row.success_rate,
      description: row.description,
      requirements: row.requirements || [],
      apply_link: row.apply_link,
      created_at: row.created_at,
      updated_at: row.updated_at,
      status: {
        id: row.status_id,
        name: row.status_name,
      },
      category: {
        id: row.category_id,
        name: row.category_name,
        icon: row.category_icon,
        description: row.category_description,
      },
    };
  }

  /**
   * Calculate success rate for a grant based on applications
   */
  static async calculateSuccessRate(grantId: string): Promise<number> {
    const queryText = `
      SELECT
        COUNT(*) FILTER (WHERE status = 'Zatwierdzona') as approved,
        COUNT(*) FILTER (WHERE status IN ('Zatwierdzona', 'Odrzucona')) as total
      FROM applications
      WHERE grant_id = $1
    `;

    const result = await query(queryText, [grantId]);
    const { approved, total } = result.rows[0];

    if (total === 0) {
      return 0;
    }

    return Math.round((approved / total) * 100);
  }

  /**
   * Filter grants by deadline range
   */
  static async filterByDeadline(startDate: string, endDate: string): Promise<Grant[]> {
    const queryText = `
      SELECT * FROM grants
      WHERE deadline >= $1 AND deadline <= $2
      ORDER BY deadline ASC
    `;

    const result = await query(queryText, [startDate, endDate]);
    return result.rows;
  }

  /**
   * Get grants by category
   */
  static async getGrantsByCategory(categoryId: string): Promise<Grant[]> {
    const queryText = `
      SELECT * FROM grants
      WHERE category_id = $1
      ORDER BY deadline ASC
    `;

    const result = await query(queryText, [categoryId]);
    return result.rows;
  }

  /**
   * Create new grant
   */
  static async createGrant(data: CreateGrantRequest): Promise<Grant> {
    const queryText = `
      INSERT INTO grants (
        name, category_id, status_id, amount_min, amount_max,
        currency, deadline, description, requirements, apply_link
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
      RETURNING *
    `;

    const params = [
      data.name,
      data.category_id,
      data.status_id,
      data.amount_min,
      data.amount_max,
      data.currency || 'EUR',
      data.deadline,
      data.description,
      JSON.stringify(data.requirements || []),
      data.apply_link,
    ];

    const result = await query(queryText, params);
    return result.rows[0];
  }

  /**
   * Update grant success rate
   */
  static async updateSuccessRate(grantId: string): Promise<void> {
    const successRate = await this.calculateSuccessRate(grantId);

    const queryText = `
      UPDATE grants
      SET success_rate = $1
      WHERE id = $2
    `;

    await query(queryText, [successRate, grantId]);
  }

  /**
   * Get grants expiring soon (within days)
   */
  static async getGrantsExpiringSoon(days: number = 30): Promise<Grant[]> {
    const queryText = `
      SELECT * FROM grants
      WHERE deadline BETWEEN NOW() AND NOW() + INTERVAL '${days} days'
      AND status_id = (SELECT id FROM statuses WHERE name = 'Aktywny')
      ORDER BY deadline ASC
    `;

    const result = await query(queryText);
    return result.rows;
  }

  /**
   * Export grants to CSV format
   */
  static async exportToCSV(filters: GrantFilters = {}): Promise<string> {
    const grants = await this.getActiveGrants(filters);

    const headers = [
      'ID', 'Name', 'Status', 'Category', 'Min Amount (EUR)', 'Max Amount (EUR)',
      'Deadline', 'Success Rate (%)', 'Apply Link'
    ];

    const rows = grants.map(g => [
      g.id,
      `"${g.name.replace(/"/g, '""')}"`,
      g.status.name,
      g.category.name,
      g.amount_min,
      g.amount_max,
      new Date(g.deadline).toISOString().split('T')[0],
      g.success_rate,
      g.apply_link || '',
    ]);

    const csv = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    return csv;
  }
}
