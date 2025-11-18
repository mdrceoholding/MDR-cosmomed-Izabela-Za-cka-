import { Request, Response, NextFunction } from 'express';
import { z, ZodError, ZodSchema } from 'zod';

/**
 * Validation middleware factory
 * Validates request body, query, or params against a Zod schema
 */
export const validateRequest = (schema: ZodSchema, source: 'body' | 'query' | 'params' = 'body') => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = source === 'body' ? req.body : source === 'query' ? req.query : req.params;
      schema.parse(data);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({
          success: false,
          error: 'Validation error',
          details: error.errors.map(err => ({
            path: err.path.join('.'),
            message: err.message,
          })),
        });
      }

      return res.status(500).json({
        success: false,
        error: 'Internal validation error',
      });
    }
  };
};

// ============================================================================
// VALIDATION SCHEMAS
// ============================================================================

/**
 * Grant validation schemas
 */
export const grantSchemas = {
  create: z.object({
    name: z.string().min(1, 'Name is required').max(500),
    category_id: z.string().uuid('Invalid category ID'),
    status_id: z.string().uuid('Invalid status ID'),
    amount_min: z.number().positive('Amount min must be positive'),
    amount_max: z.number().positive('Amount max must be positive'),
    currency: z.enum(['EUR', 'PLN']).optional(),
    deadline: z.string().datetime('Invalid deadline format'),
    description: z.string().optional(),
    requirements: z.array(z.string()).optional(),
    apply_link: z.string().url('Invalid URL').optional(),
  }).refine(data => data.amount_max >= data.amount_min, {
    message: 'Amount max must be greater than or equal to amount min',
  }),

  filters: z.object({
    status: z.string().optional(),
    category: z.string().optional(),
    country: z.string().optional(),
    deadline_from: z.string().datetime().optional(),
    deadline_to: z.string().datetime().optional(),
    search: z.string().optional(),
  }),
};

/**
 * Partner validation schemas
 */
export const partnerSchemas = {
  create: z.object({
    name: z.string().min(1, 'Name is required').max(255),
    country: z.string().length(2, 'Country must be 2-letter ISO code').toUpperCase(),
    type: z.enum(['Przedsiębiorstwo', 'Instytut badawczy', 'Uniwersytet', 'Konsorcjum']),
    specializations: z.array(z.string()).optional(),
    contact_info: z.object({
      email: z.string().email('Invalid email').optional(),
      phone: z.string().optional(),
      website: z.string().url('Invalid website URL').optional(),
    }).optional(),
    profile_link: z.string().url('Invalid URL').optional(),
  }),

  update: z.object({
    name: z.string().min(1).max(255).optional(),
    country: z.string().length(2).toUpperCase().optional(),
    type: z.enum(['Przedsiębiorstwo', 'Instytut badawczy', 'Uniwersytet', 'Konsorcjum']).optional(),
    specializations: z.array(z.string()).optional(),
    contact_info: z.object({
      email: z.string().email().optional(),
      phone: z.string().optional(),
      website: z.string().url().optional(),
    }).optional(),
    profile_link: z.string().url().optional(),
  }),

  filters: z.object({
    country: z.string().optional(),
    type: z.string().optional(),
    search: z.string().optional(),
  }),
};

/**
 * Application validation schemas
 */
export const applicationSchemas = {
  create: z.object({
    user_id: z.string().uuid('Invalid user ID'),
    grant_id: z.string().uuid('Invalid grant ID'),
    partner_id: z.string().uuid('Invalid partner ID').optional(),
  }),

  update: z.object({
    status: z.enum(['Szkic', 'Złożona', 'W ocenie', 'Zatwierdzona', 'Odrzucona']).optional(),
    progress: z.number().min(0).max(100).optional(),
    partner_id: z.string().uuid('Invalid partner ID').optional(),
  }),
};

/**
 * Document validation schemas
 */
export const documentSchemas = {
  upload: z.object({
    type: z.enum(['CV', 'Budget', 'Timeline', 'Impact']),
    file_url: z.string().url('Invalid file URL').optional(),
    file_size: z.number().positive('File size must be positive').optional(),
  }),
};

/**
 * User validation schemas
 */
export const userSchemas = {
  create: z.object({
    name: z.string().min(1, 'Name is required').max(255),
    email: z.string().email('Invalid email'),
    organization: z.string().max(255).optional(),
    roles: z.array(z.enum(['Admin', 'Manager', 'Viewer'])).min(1, 'At least one role is required'),
  }),

  update: z.object({
    name: z.string().min(1).max(255).optional(),
    organization: z.string().max(255).optional(),
    roles: z.array(z.enum(['Admin', 'Manager', 'Viewer'])).optional(),
  }),
};

/**
 * Notification validation schemas
 */
export const notificationSchemas = {
  filters: z.object({
    user_id: z.string().uuid('Invalid user ID'),
    limit: z.number().int().positive().max(100).optional(),
    unread_only: z.boolean().optional(),
  }),
};

/**
 * Validate UUID parameter
 */
export const validateUUID = (paramName: string = 'id') => {
  return (req: Request, res: Response, next: NextFunction) => {
    const schema = z.object({
      [paramName]: z.string().uuid(`Invalid ${paramName}`),
    });

    try {
      schema.parse(req.params);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({
          success: false,
          error: `Invalid ${paramName} format`,
        });
      }

      return res.status(500).json({
        success: false,
        error: 'Internal validation error',
      });
    }
  };
};

/**
 * Validate pagination parameters
 */
export const validatePagination = (req: Request, res: Response, next: NextFunction) => {
  const schema = z.object({
    page: z.string().regex(/^\d+$/).transform(Number).optional(),
    limit: z.string().regex(/^\d+$/).transform(Number).optional(),
  });

  try {
    const result = schema.parse(req.query);

    // Set default values
    req.query.page = String(result.page || 1);
    req.query.limit = String(result.limit || 20);

    next();
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({
        success: false,
        error: 'Invalid pagination parameters',
      });
    }

    return res.status(500).json({
      success: false,
      error: 'Internal validation error',
    });
  }
};
