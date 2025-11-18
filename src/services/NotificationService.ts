import { query } from '../config/database';
import { Notification, NotificationType } from '../types';

export class NotificationService {
  /**
   * Create deadline notification
   */
  static async createDeadlineNotification(
    userId: string,
    grantId: string,
    daysUntil: number
  ): Promise<Notification> {
    const grantResult = await query('SELECT name FROM grants WHERE id = $1', [grantId]);
    const grantName = grantResult.rows[0]?.name || 'Unknown Grant';

    const title = `Deadline approaching: ${grantName}`;
    const message = `The deadline for "${grantName}" is in ${daysUntil} day${daysUntil !== 1 ? 's' : ''}. Don't miss out!`;

    return this.createNotification(userId, 'Deadline', title, message, grantId);
  }

  /**
   * Create status change notification
   */
  static async createStatusChangeNotification(
    userId: string,
    appId: string,
    newStatus: string
  ): Promise<Notification> {
    const appResult = await query(
      `SELECT g.name, g.id
       FROM applications a
       JOIN grants g ON a.grant_id = g.id
       WHERE a.id = $1`,
      [appId]
    );

    const grantName = appResult.rows[0]?.name || 'Unknown Grant';
    const grantId = appResult.rows[0]?.id;

    const title = `Application status updated`;
    const message = `Your application for "${grantName}" has been updated to: ${newStatus}`;

    return this.createNotification(userId, 'StatusChange', title, message, grantId);
  }

  /**
   * Create new grant notification
   */
  static async createNewGrantNotification(
    userIds: string[],
    grantId: string
  ): Promise<Notification[]> {
    const grantResult = await query(
      `SELECT g.name, c.name as category
       FROM grants g
       JOIN categories c ON g.category_id = c.id
       WHERE g.id = $1`,
      [grantId]
    );

    const grantName = grantResult.rows[0]?.name || 'Unknown Grant';
    const category = grantResult.rows[0]?.category || 'General';

    const title = `New grant available: ${grantName}`;
    const message = `A new grant in ${category} category is now available. Check it out!`;

    const notifications: Notification[] = [];

    for (const userId of userIds) {
      const notification = await this.createNotification(
        userId,
        'NewGrant',
        title,
        message,
        grantId
      );
      notifications.push(notification);
    }

    return notifications;
  }

  /**
   * Create application update notification
   */
  static async createApplicationUpdateNotification(
    userId: string,
    appId: string,
    updateType: string
  ): Promise<Notification> {
    const appResult = await query(
      `SELECT g.name, g.id
       FROM applications a
       JOIN grants g ON a.grant_id = g.id
       WHERE a.id = $1`,
      [appId]
    );

    const grantName = appResult.rows[0]?.name || 'Unknown Grant';
    const grantId = appResult.rows[0]?.id;

    const title = `Application updated`;
    const message = `Your application for "${grantName}" has been updated: ${updateType}`;

    return this.createNotification(userId, 'ApplicationUpdate', title, message, grantId);
  }

  /**
   * Generic create notification
   */
  private static async createNotification(
    userId: string,
    type: NotificationType,
    title: string,
    message: string,
    grantId?: string
  ): Promise<Notification> {
    const queryText = `
      INSERT INTO notifications (user_id, type, title, message, grant_id, is_read)
      VALUES ($1, $2, $3, $4, $5, FALSE)
      RETURNING *
    `;

    const result = await query(queryText, [userId, type, title, message, grantId || null]);
    return result.rows[0];
  }

  /**
   * Get unread notifications for user
   */
  static async getUnreadNotifications(userId: string, limit: number = 20): Promise<Notification[]> {
    const queryText = `
      SELECT n.*, g.name as grant_name
      FROM notifications n
      LEFT JOIN grants g ON n.grant_id = g.id
      WHERE n.user_id = $1 AND n.is_read = FALSE
      ORDER BY n.created_at DESC
      LIMIT $2
    `;

    const result = await query(queryText, [userId, limit]);
    return result.rows;
  }

  /**
   * Get all notifications for user
   */
  static async getUserNotifications(userId: string, limit: number = 50): Promise<Notification[]> {
    const queryText = `
      SELECT n.*, g.name as grant_name
      FROM notifications n
      LEFT JOIN grants g ON n.grant_id = g.id
      WHERE n.user_id = $1
      ORDER BY n.created_at DESC
      LIMIT $2
    `;

    const result = await query(queryText, [userId, limit]);
    return result.rows;
  }

  /**
   * Mark notification as read
   */
  static async markAsRead(notificationId: string): Promise<Notification> {
    const queryText = `
      UPDATE notifications
      SET is_read = TRUE
      WHERE id = $1
      RETURNING *
    `;

    const result = await query(queryText, [notificationId]);

    if (result.rows.length === 0) {
      throw new Error('Notification not found');
    }

    return result.rows[0];
  }

  /**
   * Mark all notifications as read for user
   */
  static async markAllAsRead(userId: string): Promise<number> {
    const queryText = `
      UPDATE notifications
      SET is_read = TRUE
      WHERE user_id = $1 AND is_read = FALSE
    `;

    const result = await query(queryText, [userId]);
    return result.rowCount || 0;
  }

  /**
   * Delete notification
   */
  static async deleteNotification(notificationId: string): Promise<void> {
    await query('DELETE FROM notifications WHERE id = $1', [notificationId]);
  }

  /**
   * Get notification count for user
   */
  static async getNotificationCount(userId: string): Promise<{ total: number; unread: number }> {
    const queryText = `
      SELECT
        COUNT(*) as total,
        COUNT(*) FILTER (WHERE is_read = FALSE) as unread
      FROM notifications
      WHERE user_id = $1
    `;

    const result = await query(queryText, [userId]);
    return {
      total: parseInt(result.rows[0].total),
      unread: parseInt(result.rows[0].unread),
    };
  }

  /**
   * Send deadline reminders for grants expiring soon
   */
  static async sendDeadlineReminders(daysUntil: number = 7): Promise<number> {
    // Get all active grants expiring in N days
    const grantsQuery = `
      SELECT g.id, g.name, g.deadline
      FROM grants g
      JOIN statuses s ON g.status_id = s.id
      WHERE s.name = 'Aktywny'
      AND g.deadline BETWEEN NOW() AND NOW() + INTERVAL '${daysUntil} days'
    `;

    const grantsResult = await query(grantsQuery);

    let notificationCount = 0;

    for (const grant of grantsResult.rows) {
      // Get all users who have started applications for this grant
      const usersQuery = `
        SELECT DISTINCT user_id
        FROM applications
        WHERE grant_id = $1
        AND status IN ('Szkic', 'Złożona', 'W ocenie')
      `;

      const usersResult = await query(usersQuery, [grant.id]);

      for (const user of usersResult.rows) {
        await this.createDeadlineNotification(
          user.user_id,
          grant.id,
          Math.ceil((new Date(grant.deadline).getTime() - Date.now()) / (1000 * 60 * 60 * 24))
        );
        notificationCount++;
      }
    }

    return notificationCount;
  }
}
