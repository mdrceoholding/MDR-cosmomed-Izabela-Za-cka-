import { query } from '../config/database';
import { Partner, PartnerWithApplications, CreatePartnerRequest, PartnerFilters } from '../types';

export class PartnerService {
  /**
   * Create new partner
   */
  static async createPartner(data: CreatePartnerRequest): Promise<Partner> {
    const queryText = `
      INSERT INTO partners (
        name, country, type, specializations, contact_info, profile_link
      )
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *
    `;

    const params = [
      data.name,
      data.country,
      data.type,
      JSON.stringify(data.specializations || []),
      JSON.stringify(data.contact_info || {}),
      data.profile_link || null,
    ];

    const result = await query(queryText, params);
    const row = result.rows[0];

    return {
      ...row,
      specializations: row.specializations || [],
      contact_info: row.contact_info || {},
    };
  }

  /**
   * Search partners with filters
   */
  static async searchPartners(filters: PartnerFilters = {}): Promise<Partner[]> {
    let queryText = 'SELECT * FROM partners WHERE 1=1';
    const params: any[] = [];
    let paramIndex = 1;

    // Filter by country
    if (filters.country) {
      queryText += ` AND country = $${paramIndex}`;
      params.push(filters.country);
      paramIndex++;
    }

    // Filter by type
    if (filters.type) {
      queryText += ` AND type = $${paramIndex}`;
      params.push(filters.type);
      paramIndex++;
    }

    // Search in name or specializations
    if (filters.search) {
      queryText += ` AND (
        name ILIKE $${paramIndex} OR
        specializations::text ILIKE $${paramIndex}
      )`;
      params.push(`%${filters.search}%`);
      paramIndex++;
    }

    queryText += ' ORDER BY created_at DESC';

    const result = await query(queryText, params);

    return result.rows.map(row => ({
      ...row,
      specializations: row.specializations || [],
      contact_info: row.contact_info || {},
    }));
  }

  /**
   * Get partner profile by ID
   */
  static async getPartnerProfile(id: string): Promise<PartnerWithApplications | null> {
    const queryText = 'SELECT * FROM partners WHERE id = $1';
    const result = await query(queryText, [id]);

    if (result.rows.length === 0) {
      return null;
    }

    const partner = result.rows[0];

    // Get related applications
    const appsQuery = `
      SELECT
        a.*,
        g.name as grant_name,
        g.deadline as grant_deadline,
        u.name as user_name
      FROM applications a
      JOIN grants g ON a.grant_id = g.id
      JOIN users u ON a.user_id = u.id
      WHERE a.partner_id = $1
      ORDER BY a.created_at DESC
    `;

    const appsResult = await query(appsQuery, [id]);

    return {
      ...partner,
      specializations: partner.specializations || [],
      contact_info: partner.contact_info || {},
      applications: appsResult.rows,
    };
  }

  /**
   * Get partner applications
   */
  static async getPartnerApplications(id: string) {
    const queryText = `
      SELECT
        a.*,
        g.name as grant_name,
        g.amount_min,
        g.amount_max,
        g.deadline,
        c.name as category_name,
        u.name as user_name,
        u.organization
      FROM applications a
      JOIN grants g ON a.grant_id = g.id
      JOIN categories c ON g.category_id = c.id
      JOIN users u ON a.user_id = u.id
      WHERE a.partner_id = $1
      ORDER BY a.created_at DESC
    `;

    const result = await query(queryText, [id]);
    return result.rows;
  }

  /**
   * Update partner
   */
  static async updatePartner(id: string, updates: Partial<CreatePartnerRequest>): Promise<Partner> {
    const fields: string[] = [];
    const params: any[] = [];
    let paramIndex = 1;

    if (updates.name !== undefined) {
      fields.push(`name = $${paramIndex}`);
      params.push(updates.name);
      paramIndex++;
    }

    if (updates.country !== undefined) {
      fields.push(`country = $${paramIndex}`);
      params.push(updates.country);
      paramIndex++;
    }

    if (updates.type !== undefined) {
      fields.push(`type = $${paramIndex}`);
      params.push(updates.type);
      paramIndex++;
    }

    if (updates.specializations !== undefined) {
      fields.push(`specializations = $${paramIndex}`);
      params.push(JSON.stringify(updates.specializations));
      paramIndex++;
    }

    if (updates.contact_info !== undefined) {
      fields.push(`contact_info = $${paramIndex}`);
      params.push(JSON.stringify(updates.contact_info));
      paramIndex++;
    }

    if (updates.profile_link !== undefined) {
      fields.push(`profile_link = $${paramIndex}`);
      params.push(updates.profile_link);
      paramIndex++;
    }

    if (fields.length === 0) {
      throw new Error('No updates provided');
    }

    params.push(id);
    const queryText = `
      UPDATE partners
      SET ${fields.join(', ')}
      WHERE id = $${paramIndex}
      RETURNING *
    `;

    const result = await query(queryText, params);

    if (result.rows.length === 0) {
      throw new Error('Partner not found');
    }

    const row = result.rows[0];
    return {
      ...row,
      specializations: row.specializations || [],
      contact_info: row.contact_info || {},
    };
  }

  /**
   * Delete partner
   */
  static async deletePartner(id: string): Promise<void> {
    await query('DELETE FROM partners WHERE id = $1', [id]);
  }

  /**
   * Get partners by country
   */
  static async getPartnersByCountry(country: string): Promise<Partner[]> {
    const queryText = 'SELECT * FROM partners WHERE country = $1 ORDER BY name ASC';
    const result = await query(queryText, [country]);

    return result.rows.map(row => ({
      ...row,
      specializations: row.specializations || [],
      contact_info: row.contact_info || {},
    }));
  }

  /**
   * Get partners by type
   */
  static async getPartnersByType(type: string): Promise<Partner[]> {
    const queryText = 'SELECT * FROM partners WHERE type = $1 ORDER BY name ASC';
    const result = await query(queryText, [type]);

    return result.rows.map(row => ({
      ...row,
      specializations: row.specializations || [],
      contact_info: row.contact_info || {},
    }));
  }

  /**
   * Get partner statistics
   */
  static async getPartnerStats(id: string) {
    const queryText = `
      SELECT
        COUNT(*) as total_applications,
        COUNT(*) FILTER (WHERE status = 'Zatwierdzona') as approved,
        COUNT(*) FILTER (WHERE status = 'Odrzucona') as rejected,
        COUNT(*) FILTER (WHERE status = 'W ocenie') as in_review
      FROM applications
      WHERE partner_id = $1
    `;

    const result = await query(queryText, [id]);
    const stats = result.rows[0];

    return {
      ...stats,
      total_applications: parseInt(stats.total_applications),
      approved: parseInt(stats.approved),
      rejected: parseInt(stats.rejected),
      in_review: parseInt(stats.in_review),
      success_rate: stats.total_applications > 0
        ? Math.round((stats.approved / stats.total_applications) * 100)
        : 0,
    };
  }

  /**
   * Find matching partners for a grant based on specializations
   */
  static async findMatchingPartners(grantId: string, limit: number = 10): Promise<Partner[]> {
    const grantQuery = `
      SELECT c.name as category, g.requirements
      FROM grants g
      JOIN categories c ON g.category_id = c.id
      WHERE g.id = $1
    `;

    const grantResult = await query(grantQuery, [grantId]);

    if (grantResult.rows.length === 0) {
      return [];
    }

    const { category } = grantResult.rows[0];

    // Find partners with matching specializations
    const partnersQuery = `
      SELECT *
      FROM partners
      WHERE specializations::text ILIKE $1
      ORDER BY created_at DESC
      LIMIT $2
    `;

    const result = await query(partnersQuery, [`%${category}%`, limit]);

    return result.rows.map(row => ({
      ...row,
      specializations: row.specializations || [],
      contact_info: row.contact_info || {},
    }));
  }

  /**
   * Get all unique countries
   */
  static async getAllCountries(): Promise<string[]> {
    const queryText = `
      SELECT DISTINCT country
      FROM partners
      ORDER BY country ASC
    `;

    const result = await query(queryText);
    return result.rows.map(row => row.country);
  }

  /**
   * Get all partner types
   */
  static async getAllTypes(): Promise<string[]> {
    const queryText = `
      SELECT DISTINCT type
      FROM partners
      ORDER BY type ASC
    `;

    const result = await query(queryText);
    return result.rows.map(row => row.type);
  }
}
