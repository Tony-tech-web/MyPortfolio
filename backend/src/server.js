const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const swaggerUi = require('swagger-ui-express');
const { pool } = require('./config/database');

// Require routes FIRST to ensure all OpenAPI paths are registered
const authRoutes = require('./routes/auth');
const projectRoutes = require('./routes/projects');
const blogRoutes = require('./routes/blog');
const contactRoutes = require('./routes/contact');
const usersRoutes = require('./routes/users');

const { errorHandler } = require('./middleware/errorHandler');
const { generateOpenApiSpec } = require('./config/swagger');

const app = express();

// Security middleware
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Body parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Swagger Documentation - single source of truth from Zod
const fs = require('fs');
const path = require('path');
const openapiDocument = generateOpenApiSpec();

const customCss = fs.readFileSync(path.join(__dirname, 'config', 'swagger-theme.css'), 'utf8');

const swaggerUiOptions = {
  customCss,
  customSiteTitle: "Portfolio API Documentation",
  swaggerOptions: {
    persistAuthorization: true,
    docExpansion: "list",
    defaultModelsExpandDepth: -1
  }
};

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openapiDocument, swaggerUiOptions));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/blog', blogRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/users', usersRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Root route
app.get('/', (req, res) => {
  res.send('Portfolio API is running');
});

// Error handling
app.use(errorHandler);

const PORT = process.env.PORT || 3001;

// Database connection with graceful handling
let dbConnected = false;
pool.connect((err) => {
  if (err) {
    console.error('Database connection error:', err);
    console.log('Server will start without database connection. Some features may not work.');
  } else {
    console.log('Connected to PostgreSQL database');
    dbConnected = true;
  }
});

// Start server regardless of database connection
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`API Documentation available at http://localhost:${PORT}/api-docs`);
  console.log(`Database connected: ${dbConnected}`);
});
