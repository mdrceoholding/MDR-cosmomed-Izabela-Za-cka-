import pool, { query } from '../config/database';
import {
  Application,
  ApplicationWithDetails,
  CreateApplicationRequest,
  UpdateApplicationRequest,
  ApplicationStatus,
} from '../types';

export class ApplicationService {
  /**
   * Create new application
   */
  static async createApplication(data: CreateApplicationRequest): Promise<Application> {
    const queryText = `
      INSERT INTO applications (user_id, grant_id, partner_id, status, progress)
      VALUES ($1, $2, $3, 'Szkic', 0)
      RETURNING *
    `;

    const params = [data.user_id, data.grant_id, data.partner_id || null];
    const result = await query(queryText, params);

    return result.rows[0];
  }

  /**
   * Update application status
   */
  static async updateApplicationStatus(
    appId: string,
    status: ApplicationStatus
  ): Promise<Application> {
    const submittedAt = status === 'Złożona' ? new Date() : null;

    const queryText = `
      UPDATE applications
      SET status = $1, submitted_at = COALESCE(submitted_at, $2)
      WHERE id = $3
      RETURNING *
    `;

    const result = await query(queryText, [status, submittedAt, appId]);

    if (result.rows.length === 0) {
      throw new Error('Application not found');
    }

    return result.rows[0];
  }

  /**
   * Update application
   */
  static async updateApplication(
    appId: string,
    updates: UpdateApplicationRequest
  ): Promise<Application> {
    const fields: string[] = [];
    const params: any[] = [];
    let paramIndex = 1;

    if (updates.status !== undefined) {
      fields.push(`status = $${paramIndex}`);
      params.push(updates.status);
      paramIndex++;

      // Set submitted_at when status becomes 'Złożona'
      if (updates.status === 'Złożona') {
        fields.push(`submitted_at = COALESCE(submitted_at, NOW())`);
      }
    }

    if (updates.progress !== undefined) {
      fields.push(`progress = $${paramIndex}`);
      params.push(updates.progress);
      paramIndex++;
    }

    if (updates.partner_id !== undefined) {
      fields.push(`partner_id = $${paramIndex}`);
      params.push(updates.partner_id);
      paramIndex++;
    }

    if (fields.length === 0) {
      throw new Error('No updates provided');
    }

    params.push(appId);
    const queryText = `
      UPDATE applications
      SET ${fields.join(', ')}
      WHERE id = $${paramIndex}
      RETURNING *
    `;

    const result = await query(queryText, params);

    if (result.rows.length === 0) {
      throw new Error('Application not found');
    }

    return result.rows[0];
  }

  /**
   * Calculate application progress based on documents
   */
  static async calculateProgress(appId: string): Promise<number> {
    const requiredDocs = ['CV', 'Budget', 'Timeline', 'Impact'];

    const queryText = `
      SELECT DISTINCT type
      FROM documents
      WHERE application_id = $1
    `;

    const result = await query(queryText, [appId]);
    const uploadedTypes = result.rows.map(r => r.type);

    const completedCount = requiredDocs.filter(type => uploadedTypes.includes(type)).length;
    const progress = Math.round((completedCount / requiredDocs.length) * 100);

    // Update progress in database
    await query('UPDATE applications SET progress = $1 WHERE id = $2', [progress, appId]);

    return progress;
  }

  /**
   * Get applications by user
   */
  static async getApplicationsByUser(userId: string): Promise<ApplicationWithDetails[]> {
    const queryText = `
      SELECT
        a.*,
        g.name as grant_name,
        g.deadline as grant_deadline,
        g.amount_min,
        g.amount_max,
        g.currency,
        c.name as category_name,
        c.icon as category_icon,
        s.name as status_name,
        p.name as partner_name,
        p.country as partner_country
      FROM applications a
      JOIN grants g ON a.grant_id = g.id
      JOIN categories c ON g.category_id = c.id
      JOIN statuses s ON g.status_id = s.id
      LEFT JOIN partners p ON a.partner_id = p.id
      WHERE a.user_id = $1
      ORDER BY a.created_at DESC
    `;

    const result = await query(queryText, [userId]);

    return result.rows.map(row => ({
      id: row.id,
      user_id: row.user_id,
      grant_id: row.grant_id,
      partner_id: row.partner_id,
      status: row.status,
      submitted_at: row.submitted_at,
      progress: row.progress,
      created_at: row.created_at,
      updated_at: row.updated_at,
      grant: {
        id: row.grant_id,
        name: row.grant_name,
        deadline: row.grant_deadline,
        amount_min: parseFloat(row.amount_min),
        amount_max: parseFloat(row.amount_max),
        currency: row.currency,
      },
      partner: row.partner_name ? {
        id: row.partner_id,
        name: row.partner_name,
        country: row.partner_country,
      } : undefined,
    }));
  }

  /**
   * Get application by ID with full details
   */
  static async getApplicationById(appId: string): Promise<ApplicationWithDetails | null> {
    const queryText = `
      SELECT
        a.*,
        g.name as grant_name,
        g.deadline as grant_deadline,
        g.amount_min,
        g.amount_max,
        g.currency,
        g.description as grant_description,
        c.name as category_name,
        p.name as partner_name,
        p.country as partner_country,
        p.type as partner_type,
        p.contact_info as partner_contact
      FROM applications a
      JOIN grants g ON a.grant_id = g.id
      JOIN categories c ON g.category_id = c.id
      LEFT JOIN partners p ON a.partner_id = p.id
      WHERE a.id = $1
    `;

    const result = await query(queryText, [appId]);

    if (result.rows.length === 0) {
      return null;
    }

    const row = result.rows[0];

    // Get documents
    const docsQuery = await query(
      'SELECT * FROM documents WHERE application_id = $1 ORDER BY created_at DESC',
      [appId]
    );

    return {
      id: row.id,
      user_id: row.user_id,
      grant_id: row.grant_id,
      partner_id: row.partner_id,
      status: row.status,
      submitted_at: row.submitted_at,
      progress: row.progress,
      created_at: row.created_at,
      updated_at: row.updated_at,
      grant: {
        id: row.grant_id,
        name: row.grant_name,
        deadline: row.grant_deadline,
        amount_min: parseFloat(row.amount_min),
        amount_max: parseFloat(row.amount_max),
        currency: row.currency,
        description: row.grant_description,
      },
      partner: row.partner_name ? {
        id: row.partner_id,
        name: row.partner_name,
        country: row.partner_country,
        type: row.partner_type,
        contact_info: row.partner_contact,
      } : undefined,
      documents: docsQuery.rows,
    };
  }

  /**
   * Validate application completion before submission
   */
  static async validateApplicationCompletion(appId: string): Promise<{
    valid: boolean;
    errors: string[];
  }> {
    const errors: string[] = [];
    const requiredDocs = ['CV', 'Budget', 'Timeline', 'Impact'];

    // Check documents
    const docsQuery = await query(
      'SELECT DISTINCT type FROM documents WHERE application_id = $1',
      [appId]
    );

    const uploadedTypes = docsQuery.rows.map(r => r.type);
    const missingDocs = requiredDocs.filter(type => !uploadedTypes.includes(type));

    if (missingDocs.length > 0) {
      errors.push(`Missing required documents: ${missingDocs.join(', ')}`);
    }

    // Check if grant is still active
    const grantQuery = await query(
      `SELECT g.deadline, s.name as status
       FROM grants g
       JOIN statuses s ON g.status_id = s.id
       WHERE g.id = (SELECT grant_id FROM applications WHERE id = $1)`,
      [appId]
    );

    if (grantQuery.rows.length > 0) {
      const grant = grantQuery.rows[0];
      const deadline = new Date(grant.deadline);

      if (deadline < new Date()) {
        errors.push('Grant deadline has passed');
      }

      if (grant.status !== 'Aktywny') {
        errors.push('Grant is not active');
      }
    }

    return {
      valid: errors.length === 0,
      errors,
    };
  }

  /**
   * Delete application
   */
  static async deleteApplication(appId: string): Promise<void> {
    await query('DELETE FROM applications WHERE id = $1', [appId]);
  }

  /**
   * Get applications by status
   */
  static async getApplicationsByStatus(status: ApplicationStatus): Promise<Application[]> {
    const queryText = `
      SELECT * FROM applications
      WHERE status = $1
      ORDER BY created_at DESC
    `;

    const result = await query(queryText, [status]);
    return result.rows;
  }

  /**
   * Get application statistics for a user
   */
  static async getUserApplicationStats(userId: string) {
    const queryText = `
      SELECT
        COUNT(*) as total,
        COUNT(*) FILTER (WHERE status = 'Szkic') as drafts,
        COUNT(*) FILTER (WHERE status = 'Złożona') as submitted,
        COUNT(*) FILTER (WHERE status = 'W ocenie') as in_review,
        COUNT(*) FILTER (WHERE status = 'Zatwierdzona') as approved,
        COUNT(*) FILTER (WHERE status = 'Odrzucona') as rejected
      FROM applications
      WHERE user_id = $1
    `;

    const result = await query(queryText, [userId]);
    return result.rows[0];
  }
}
