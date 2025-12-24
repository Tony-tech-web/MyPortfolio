# Personal Portfolio Website with CMS

A production-ready, full-stack portfolio website featuring a content management system (CMS) for managing projects, blog posts, and contact messages. Built with modern web technologies and security best practices.

## 🚀 Overview

This project demonstrates enterprise-level software development skills through a complete portfolio platform with:
- **Public Portfolio**: Showcases projects, blog posts, and contact information
- **Admin CMS**: Secure dashboard for content management
- **RESTful API**: Well-documented backend with proper authentication
- **Security-First Design**: JWT authentication, input validation, and data protection

## 🏗️ Architecture

### System Architecture
```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   React Frontend│    │  Express Backend │    │ PostgreSQL DB   │
│                 │◄──►│                 │◄──►│                 │
│ - Public Pages  │    │ - REST API      │    │ - Projects      │
│ - Admin Dashboard│    │ - JWT Auth      │    │ - Blog Posts    │
│ - Responsive UI │    │ - Validation     │    │ - Contacts      │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

### Clean Architecture Layers
- **Presentation Layer**: React components with Tailwind CSS
- **Application Layer**: Express routes and middleware
- **Domain Layer**: Business logic in service classes
- **Infrastructure Layer**: Database models and external APIs

## 🛠️ Tech Stack

### Backend
- **Runtime**: Node.js with Express.js
- **Database**: PostgreSQL with connection pooling
- **Authentication**: JWT with refresh tokens
- **Validation**: Joi schema validation
- **Security**: Helmet, CORS, bcryptjs, express-rate-limit
- **File Upload**: Multer (configured for future use)

### Frontend
- **Framework**: React 18 with React Router
- **Styling**: Tailwind CSS for utility-first design
- **HTTP Client**: Axios for API communication
- **State Management**: React hooks (useState, useEffect)

### DevOps & Tools
- **Database**: Docker Compose for PostgreSQL
- **Version Control**: Git
- **Package Management**: npm
- **Development**: Nodemon for backend, Create React App for frontend

## 🔒 Security & Leak Prevention

### Authentication & Authorization
- JWT-based authentication with access/refresh token strategy
- Password hashing with bcryptjs (salt rounds: 10)
- Role-based access control (RBAC) for admin operations
- Secure token storage in localStorage with automatic refresh

### Data Protection
- Input sanitization and validation using Joi schemas
- SQL injection prevention through parameterized queries
- CORS configuration limiting origins to frontend URL
- Rate limiting (100 requests per 15 minutes per IP)
- Error messages that don't leak sensitive information

### Environment Security
- All secrets stored in `.env` file (not committed to git)
- Database credentials encrypted in transit
- HTTPS enforcement in production
- Security headers via Helmet middleware

## 📊 Database Design

### Schema Overview
```sql
users (id, username, email, password_hash, role, refresh_token, timestamps)
projects (id, title, description, technologies[], github_url, live_url, image_url, timestamps)
blog_posts (id, title, content, excerpt, tags[], published, timestamps)
contacts (id, name, email, message, read, timestamps)
```

### Key Relationships
- Users have roles (admin/user) for authorization
- Projects and blog posts support multiple technologies/tags
- Contacts track read status for admin management
- All tables include proper indexing for performance

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/refresh` - Refresh access token
- `POST /api/auth/logout` - User logout
- `GET /api/auth/me` - Get current user info

### Projects (Public)
- `GET /api/projects` - List all projects
- `GET /api/projects/:id` - Get project by ID

### Projects (Admin)
- `POST /api/projects` - Create project
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project

### Blog Posts (Public)
- `GET /api/blog` - List published posts

### Blog Posts (Admin)
- `GET /api/blog/admin/all` - List all posts (including drafts)
- `GET /api/blog/admin/:id` - Get post by ID
- `POST /api/blog` - Create post
- `PUT /api/blog/:id` - Update post
- `DELETE /api/blog/:id` - Delete post

### Contacts
- `POST /api/contact` - Submit contact form
- `GET /api/contact` - List all contacts (admin)
- `PATCH /api/contact/:id/read` - Mark as read (admin)
- `DELETE /api/contact/:id` - Delete contact (admin)

## 🎨 UI/UX Design Decisions

### Design Philosophy
- **Minimal & Functional**: Clean, distraction-free interface
- **Developer-Centric**: Code-like aesthetics with monospace elements
- **Dark Theme First**: Optimized for developer productivity
- **Mobile-Responsive**: Works seamlessly across devices

### Key Components
- **Navigation**: Simple header with clear section links
- **Hero Section**: Dynamic introduction with call-to-action buttons
- **Project Cards**: Consistent layout with technology tags
- **Admin Dashboard**: Tabbed interface for content management
- **Contact Form**: Accessible form with real-time validation

## 🚀 Deployment Strategy

### Development Setup
1. **Prerequisites**: Node.js 18+, Docker, Git
2. **Clone Repository**: `git clone <repository-url>`
3. **Database Setup**:
   ```bash
   docker-compose up -d
   ```
4. **Backend Setup**:
   ```bash
   cd backend
   npm install
   cp .env.example .env  # Configure environment variables
   npm run init-db      # Initialize database schema
   npm run dev          # Start development server
   ```
5. **Frontend Setup**:
   ```bash
   cd frontend
   npm install
   npm start            # Start development server
   ```

### Production Deployment
- **Backend**: Deploy to services like Heroku, Railway, or AWS
- **Frontend**: Deploy to Vercel, Netlify, or AWS S3/CloudFront
- **Database**: Use managed PostgreSQL (Supabase, Railway, AWS RDS)
- **Environment Variables**: Configure production secrets securely

### Default Admin Credentials
- **Email**: admin@portfolio.com
- **Password**: admin123
- *Change these immediately after first login!*

## 🧪 Testing Strategy

### Backend Testing
- Unit tests for models and middleware
- Integration tests for API endpoints
- Authentication flow testing
- Input validation testing

### Frontend Testing
- Component rendering tests
- User interaction tests
- API integration tests
- Responsive design testing

## 📈 Performance Optimizations

### Backend
- Database connection pooling
- Query optimization with proper indexing
- Rate limiting to prevent abuse
- Compression middleware for responses

### Frontend
- Code splitting with React.lazy
- Image optimization (future feature)
- Efficient re-rendering with React hooks
- Minimal bundle size with tree shaking

## 🔧 Development Workflow

### Code Quality
- ESLint configuration for consistent code style
- Pre-commit hooks for code quality checks
- Comprehensive error handling
- Input validation at all layers

### Git Workflow
- Feature branches for new development
- Pull requests with code review
- Semantic commit messages
- Protected main branch

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes with tests
4. Ensure all tests pass
5. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details

## 🙏 Acknowledgments

- React and Express communities for excellent documentation
- Tailwind CSS for the utility-first approach
- PostgreSQL for reliable data storage

---

## What This Project Demonstrates to Employers

This portfolio project showcases:

### Technical Skills
- **Full-Stack Development**: Complete application from database to UI
- **Security Implementation**: Production-ready authentication and data protection
- **API Design**: RESTful endpoints with proper HTTP methods and status codes
- **Database Design**: Normalized schema with relationships and indexing
- **Modern Frontend**: React with hooks, routing, and responsive design

### Software Engineering Practices
- **Clean Architecture**: Separation of concerns across layers
- **Error Handling**: Comprehensive error management without information leakage
- **Input Validation**: Client and server-side validation with meaningful feedback
- **Code Organization**: Modular structure with clear file naming and imports

### Production Readiness
- **Environment Configuration**: Proper secret management and environment variables
- **Scalability Considerations**: Connection pooling, rate limiting, and performance optimization
- **Security Best Practices**: Password hashing, JWT tokens, CORS, and security headers
- **Deployment Strategy**: Containerization and cloud deployment considerations

### Professional Development
- **Documentation**: Comprehensive README with setup and architecture details
- **Version Control**: Proper Git usage with meaningful commit messages
- **Testing Strategy**: Unit and integration testing approach
- **Code Quality**: Consistent formatting and error-free execution

This project represents the kind of work that demonstrates readiness for senior-level positions, showing not just coding ability but system design, security awareness, and production deployment skills.

1. Install the Vercel CLI: `npm i -g vercel`
2. Run `vercel` in the project root.
3. Follow the prompts to ship to production.

## 📄 License

This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for details.

---

Built with ❤️ by [Alidu Anthony](https://github.com/Tony-tech-web)
