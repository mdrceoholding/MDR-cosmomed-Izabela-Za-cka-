import express, { Application, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import compression from 'compression';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';

// Load environment variables
dotenv.config();

// Import routes and middleware
import apiRoutes from './api/routes';
import {
  errorHandler,
  notFoundHandler,
  requestLogger,
} from './middleware/errorHandler.middleware';
import { apiRateLimiter } from './middleware/rateLimit.middleware';
import pool from './config/database';

// Import mock data seeder
import { seedDatabase } from './data/mockGrants';

// Create Express app
const app: Application = express();
const PORT = process.env.PORT || 3000;

// ============================================================================
// MIDDLEWARE
// ============================================================================

// Security
app.use(helmet());

// CORS
const corsOptions = {
  origin: process.env.CORS_ORIGIN?.split(',') || '*',
  credentials: process.env.CORS_CREDENTIALS === 'true',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
};
app.use(cors(corsOptions));

// Body parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Compression
app.use(compression());

// Request logging
if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
} else {
  app.use(morgan('combined'));
}
app.use(requestLogger);

// Rate limiting
app.use('/api', apiRateLimiter);

// ============================================================================
// SWAGGER DOCUMENTATION
// ============================================================================

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'EU Grants Hub API',
      version: '1.0.0',
      description: 'REST API for EU Grants Hub - MedTech funding opportunities platform',
      contact: {
        name: 'API Support',
        email: 'support@grantshub.eu',
      },
      license: {
        name: 'MIT',
        url: 'https://opensource.org/licenses/MIT',
      },
    },
    servers: [
      {
        url: `http://localhost:${PORT}`,
        description: 'Development server',
      },
      {
        url: 'https://api.grantshub.eu',
        description: 'Production server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ['./src/api/*.ts', './src/api/routes.ts'],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

if (process.env.API_DOCS_ENABLED !== 'false') {
  app.use(
    process.env.API_DOCS_PATH || '/api-docs',
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec, {
      customCss: '.swagger-ui .topbar { display: none }',
      customSiteTitle: 'EU Grants Hub API',
    })
  );
}

// ============================================================================
// ROUTES
// ============================================================================

// Health check
app.get('/health', (req: Request, res: Response) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV,
  });
});

// API info
app.get('/', (req: Request, res: Response) => {
  res.json({
    name: 'EU Grants Hub API',
    version: '1.0.0',
    description: 'Backend API for MedTech funding opportunities',
    documentation: process.env.API_DOCS_ENABLED !== 'false' ? '/api-docs' : 'disabled',
    endpoints: {
      health: '/health',
      api: '/api',
    },
  });
});

// API routes
app.use('/api', apiRoutes);

// ============================================================================
// ERROR HANDLING
// ============================================================================

// 404 handler
app.use(notFoundHandler);

// Global error handler
app.use(errorHandler);

// ============================================================================
// DATABASE CONNECTION & SERVER START
// ============================================================================

async function startServer() {
  try {
    // Test database connection
    await pool.query('SELECT NOW()');
    console.log('✓ Database connection established');

    // Seed database in development mode
    if (process.env.DEV_AUTO_SEED === 'true' && process.env.NODE_ENV !== 'production') {
      try {
        await seedDatabase(pool);
        console.log('✓ Database seeded with mock data');
      } catch (error) {
        console.warn('⚠ Database seeding failed (may already be seeded):', error);
      }
    }

    // Start server
    app.listen(PORT, () => {
      console.log('\n═══════════════════════════════════════════════════════════');
      console.log(`🚀 EU Grants Hub Backend Server`);
      console.log(`═══════════════════════════════════════════════════════════`);
      console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
      console.log(`Port: ${PORT}`);
      console.log(`API URL: http://localhost:${PORT}/api`);
      if (process.env.API_DOCS_ENABLED !== 'false') {
        console.log(`API Docs: http://localhost:${PORT}${process.env.API_DOCS_PATH || '/api-docs'}`);
      }
      console.log(`Health Check: http://localhost:${PORT}/health`);
      console.log('═══════════════════════════════════════════════════════════\n');
    });
  } catch (error) {
    console.error('✗ Failed to start server:', error);
    process.exit(1);
  }
}

// Graceful shutdown
process.on('SIGTERM', async () => {
  console.log('\n⚠ SIGTERM signal received: closing HTTP server');
  await pool.end();
  process.exit(0);
});

process.on('SIGINT', async () => {
  console.log('\n⚠ SIGINT signal received: closing HTTP server');
  await pool.end();
  process.exit(0);
});

// Unhandled rejections
process.on('unhandledRejection', (reason, promise) => {
  console.error('✗ Unhandled Rejection at:', promise, 'reason:', reason);
  // In production, you might want to exit here
  // process.exit(1);
});

// Start the server
startServer();

export default app;
