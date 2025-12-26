import { Router, Request, Response } from 'express';
import { GrantService } from '../services/GrantService';
import { ApplicationService } from '../services/ApplicationService';
import { PartnerService } from '../services/PartnerService';
import { DashboardService } from '../services/DashboardService';
import { NotificationService } from '../services/NotificationService';
import { authMiddleware, requireRole } from '../middleware/auth.middleware';
import { validateRequest } from '../middleware/validation.middleware';
import { ApiResponse } from '../types';

const router = Router();

// ============================================================================
// GRANTS ROUTES
// ============================================================================

/**
 * GET /api/grants
 * Get all grants with optional filters
 */
router.get('/grants', async (req: Request, res: Response) => {
  try {
    const filters = {
      status: req.query.status as string,
      category: req.query.category as string,
      country: req.query.country as string,
      deadline_from: req.query.deadline_from as string,
      deadline_to: req.query.deadline_to as string,
      search: req.query.search as string,
    };

    const grants = await GrantService.getActiveGrants(filters);

    const response: ApiResponse<typeof grants> = {
      success: true,
      data: grants,
    };

    res.json(response);
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

/**
 * GET /api/grants/:id
 * Get grant details by ID
 */
router.get('/grants/:id', async (req: Request, res: Response) => {
  try {
    const grant = await GrantService.getGrantDetails(req.params.id);

    if (!grant) {
      return res.status(404).json({
        success: false,
        error: 'Grant not found',
      });
    }

    const response: ApiResponse<typeof grant> = {
      success: true,
      data: grant,
    };

    res.json(response);
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

/**
 * POST /api/grants
 * Create new grant (Admin only)
 */
router.post('/grants', authMiddleware, requireRole('Admin'), async (req: Request, res: Response) => {
  try {
    const grant = await GrantService.createGrant(req.body);

    const response: ApiResponse<typeof grant> = {
      success: true,
      data: grant,
      message: 'Grant created successfully',
    };

    res.status(201).json(response);
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

/**
 * GET /api/grants/export
 * Export grants to CSV
 */
router.get('/grants/export', async (req: Request, res: Response) => {
  try {
    const filters = {
      status: req.query.status as string,
      category: req.query.category as string,
      country: req.query.country as string,
      deadline_from: req.query.deadline_from as string,
      deadline_to: req.query.deadline_to as string,
    };

    const csv = await GrantService.exportToCSV(filters);

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename=grants_export.csv');
    res.send(csv);
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// ============================================================================
// PARTNERS ROUTES
// ============================================================================

/**
 * GET /api/partners
 * Get all partners with optional filters
 */
router.get('/partners', async (req: Request, res: Response) => {
  try {
    const filters = {
      country: req.query.country as string,
      type: req.query.type as any,
      search: req.query.search as string,
    };

    const partners = await PartnerService.searchPartners(filters);

    const response: ApiResponse<typeof partners> = {
      success: true,
      data: partners,
    };

    res.json(response);
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

/**
 * GET /api/partners/:id
 * Get partner profile by ID
 */
router.get('/partners/:id', async (req: Request, res: Response) => {
  try {
    const partner = await PartnerService.getPartnerProfile(req.params.id);

    if (!partner) {
      return res.status(404).json({
        success: false,
        error: 'Partner not found',
      });
    }

    const response: ApiResponse<typeof partner> = {
      success: true,
      data: partner,
    };

    res.json(response);
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

/**
 * POST /api/partners
 * Create new partner
 */
router.post('/partners', authMiddleware, async (req: Request, res: Response) => {
  try {
    const partner = await PartnerService.createPartner(req.body);

    const response: ApiResponse<typeof partner> = {
      success: true,
      data: partner,
      message: 'Partner created successfully',
    };

    res.status(201).json(response);
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// ============================================================================
// APPLICATIONS ROUTES
// ============================================================================

/**
 * GET /api/applications
 * Get applications (filtered by user_id)
 */
router.get('/applications', authMiddleware, async (req: Request, res: Response) => {
  try {
    const userId = req.query.user_id as string;

    if (!userId) {
      return res.status(400).json({
        success: false,
        error: 'user_id is required',
      });
    }

    const applications = await ApplicationService.getApplicationsByUser(userId);

    const response: ApiResponse<typeof applications> = {
      success: true,
      data: applications,
    };

    res.json(response);
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

/**
 * GET /api/applications/:id
 * Get application by ID
 */
router.get('/applications/:id', authMiddleware, async (req: Request, res: Response) => {
  try {
    const application = await ApplicationService.getApplicationById(req.params.id);

    if (!application) {
      return res.status(404).json({
        success: false,
        error: 'Application not found',
      });
    }

    const response: ApiResponse<typeof application> = {
      success: true,
      data: application,
    };

    res.json(response);
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

/**
 * POST /api/applications
 * Create new application
 */
router.post('/applications', authMiddleware, async (req: Request, res: Response) => {
  try {
    const application = await ApplicationService.createApplication(req.body);

    const response: ApiResponse<typeof application> = {
      success: true,
      data: application,
      message: 'Application created successfully',
    };

    res.status(201).json(response);
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

/**
 * PUT /api/applications/:id
 * Update application
 */
router.put('/applications/:id', authMiddleware, async (req: Request, res: Response) => {
  try {
    const application = await ApplicationService.updateApplication(req.params.id, req.body);

    const response: ApiResponse<typeof application> = {
      success: true,
      data: application,
      message: 'Application updated successfully',
    };

    res.json(response);
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

/**
 * POST /api/applications/:id/documents
 * Upload document for application
 */
router.post('/applications/:id/documents', authMiddleware, async (req: Request, res: Response) => {
  try {
    // Mock file upload implementation
    // In production, use multer or similar for file uploads
    const document = {
      id: crypto.randomUUID(),
      application_id: req.params.id,
      type: req.body.type,
      file_url: req.body.file_url || '/uploads/document.pdf',
      file_size: req.body.file_size || 1024,
      created_at: new Date(),
    };

    // Update application progress after document upload
    await ApplicationService.calculateProgress(req.params.id);

    const response: ApiResponse<typeof document> = {
      success: true,
      data: document,
      message: 'Document uploaded successfully',
    };

    res.status(201).json(response);
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// ============================================================================
// DASHBOARD ROUTES
// ============================================================================

/**
 * GET /api/dashboard/kpis
 * Get dashboard KPIs
 */
router.get('/dashboard/kpis', async (req: Request, res: Response) => {
  try {
    const kpis = await DashboardService.getKPIs();

    const response: ApiResponse<typeof kpis> = {
      success: true,
      data: kpis,
    };

    res.json(response);
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// ============================================================================
// NOTIFICATIONS ROUTES
// ============================================================================

/**
 * GET /api/notifications
 * Get user notifications
 */
router.get('/notifications', authMiddleware, async (req: Request, res: Response) => {
  try {
    const userId = req.query.user_id as string;
    const limit = parseInt(req.query.limit as string) || 20;

    if (!userId) {
      return res.status(400).json({
        success: false,
        error: 'user_id is required',
      });
    }

    const notifications = await NotificationService.getUserNotifications(userId, limit);

    const response: ApiResponse<typeof notifications> = {
      success: true,
      data: notifications,
    };

    res.json(response);
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

/**
 * POST /api/notifications/:id/read
 * Mark notification as read
 */
router.post('/notifications/:id/read', authMiddleware, async (req: Request, res: Response) => {
  try {
    const notification = await NotificationService.markAsRead(req.params.id);

    const response: ApiResponse<typeof notification> = {
      success: true,
      data: notification,
      message: 'Notification marked as read',
    };

    res.json(response);
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// ============================================================================
// CATEGORIES ROUTES
// ============================================================================

/**
 * GET /api/categories
 * Get all categories
 */
router.get('/categories', async (req: Request, res: Response) => {
  try {
    const result = await import('../config/database').then(db =>
      db.query('SELECT * FROM categories ORDER BY name ASC')
    );

    const response: ApiResponse<typeof result.rows> = {
      success: true,
      data: result.rows,
    };

    res.json(response);
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

/**
 * GET /api/statuses
 * Get all statuses
 */
router.get('/statuses', async (req: Request, res: Response) => {
  try {
    const result = await import('../config/database').then(db =>
      db.query('SELECT * FROM statuses ORDER BY name ASC')
    );

    const response: ApiResponse<typeof result.rows> = {
      success: true,
      data: result.rows,
    };

    res.json(response);
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

export default router;
