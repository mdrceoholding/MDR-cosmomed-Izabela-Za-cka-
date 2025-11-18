const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const dotenv = require('dotenv');
const path = require('path');

// Load env vars
dotenv.config();

// Import database and models
const { sequelize, testConnection, syncDatabase } = require('./models');
const errorHandler = require('./middleware/errorHandler');

// Route imports
const authRoutes = require('./routes/auth');
const sessionRoutes = require('./routes/sessions');
const journalRoutes = require('./routes/journals');
const facilitatorRoutes = require('./routes/facilitator');
const medicalConsentRoutes = require('./routes/medicalConsent');

const app = express();

// Security middleware
app.use(helmet());

// CORS configuration
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));

// Body parser
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Zbyt wiele żądań z tego adresu IP, proszę spróbować później'
});

app.use('/api/', limiter);

// Static files
app.use('/public', express.static(path.join(__dirname, '../public')));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server is running',
    timestamp: new Date().toISOString()
  });
});

// Mount routers
app.use('/api/auth', authRoutes);
app.use('/api/sessions', sessionRoutes);
app.use('/api/journals', journalRoutes);
app.use('/api/facilitator', facilitatorRoutes);
app.use('/api/medical-consent', medicalConsentRoutes);

// API documentation endpoint
app.get('/api', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Holotropic Breathwork API',
    version: '1.0.0',
    endpoints: {
      auth: '/api/auth',
      sessions: '/api/sessions',
      journals: '/api/journals',
      facilitator: '/api/facilitator',
      medicalConsent: '/api/medical-consent',
      health: '/api/health'
    }
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Endpoint nie został znaleziony'
  });
});

// Error handler middleware (must be last)
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

// Initialize server
const startServer = async () => {
  try {
    // Test database connection
    await testConnection();

    // Sync database models
    await syncDatabase();

    // Start server
    const server = app.listen(PORT, () => {
      console.log(`
╔═══════════════════════════════════════════════════════════╗
║                                                           ║
║   🫁 Holotropic Breathwork API Server                    ║
║                                                           ║
║   Environment: ${process.env.NODE_ENV || 'development'}                                    ║
║   Port: ${PORT}                                            ║
║   Database: Connected ✓                                   ║
║                                                           ║
║   API Documentation: http://localhost:${PORT}/api          ║
║   Health Check: http://localhost:${PORT}/api/health        ║
║                                                           ║
╚═══════════════════════════════════════════════════════════╝
      `);
    });

    // Handle unhandled promise rejections
    process.on('unhandledRejection', (err) => {
      console.error('Unhandled Rejection:', err);
      server.close(() => process.exit(1));
    });

    // Handle SIGTERM
    process.on('SIGTERM', () => {
      console.log('SIGTERM received, shutting down gracefully...');
      server.close(() => {
        console.log('Process terminated');
        process.exit(0);
      });
    });

  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();

module.exports = app;
