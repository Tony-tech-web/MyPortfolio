# 🚀 Personal Portfolio - Alidu Anthony

A modern, full-stack portfolio website built with React, featuring glassmorphism design, dynamic content loading, and a beautiful user interface.

![Portfolio Preview](https://img.shields.io/badge/Status-Live-success?style=for-the-badge)
![React](https://img.shields.io/badge/React-18.x-61DAFB?style=for-the-badge&logo=react)
![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=for-the-badge&logo=node.js)

## ✨ Features

- **🎨 Modern Glassmorphism UI** - Stunning frosted glass effects with backdrop-filter
- **⚡ Dynamic Content** - Projects and blog posts loaded from API/Blogger
- **🌓 Theme Toggle** - Seamless dark/light mode switching
- **📱 Fully Responsive** - Optimized for all devices
- **🎭 Smooth Animations** - Intersection Observer-based scroll reveals
- **💬 Contact Form** - Integrated with Web3Forms API
- **🔒 Type-Safe** - Built with modern React best practices

## 🛠️ Tech Stack

### Frontend

- **React 18** - Modern UI library with hooks
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client for API requests
- **React Router** - Client-side routing (if applicable)

### Backend

- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **PostgreSQL** - Database for projects/posts
- **Blogger API** - External blog integration

### Development

- **Vite** - Fast build tool and dev server
- **Docker** - Containerization for PostgreSQL
- **Git** - Version control

## 📂 Project Structure

```
portfolio/
├── frontend/              # React application
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   │   ├── Header.js
│   │   │   ├── Hero.js
│   │   │   ├── Projects.js
│   │   │   ├── Blog.js
│   │   │   └── Contact.js
│   │   ├── pages/         # Page components
│   │   ├── App.js         # Main app component
│   │   └── index.css      # Global styles
│   └── package.json
│
├── backend/               # Express API server
│   ├── src/
│   │   ├── routes/        # API routes
│   │   └── models/        # Database models
│   └── package.json
│
├── docker-compose.yml     # PostgreSQL container
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **Docker** (optional, for PostgreSQL)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/Tony-tech-web/My-Portfolio.git
   cd My-Portfolio
   ```

2. **Install frontend dependencies**

   ```bash
   cd frontend
   npm install
   ```

3. **Install backend dependencies**

   ```bash
   cd ../backend
   npm install
   ```

4. **Set up environment variables**

   Create `.env` file in `backend/`:

   ```env
   PORT=3001
   DATABASE_URL=postgresql://user:password@localhost:5432/portfolio_db
   ```

   Create `.env` file in `frontend/`:

   ```env
   REACT_APP_BLOGGER_API_KEY=your_blogger_api_key_here
   REACT_APP_API_URL=http://localhost:3001
   ```

5. **Start PostgreSQL** (optional)
   ```bash
   docker-compose up -d
   ```

### Running the Application

**Development Mode:**

```bash
# Terminal 1 - Start backend
cd backend
npm run dev

# Terminal 2 - Start frontend
cd frontend
npm start
```

The application will open at `http://localhost:3000`

**Production Build:**

```bash
cd frontend
npm run build
```

## 🎨 Key Components

### Projects Section

Displays 7+ projects with:

- GitHub repository links
- Technology tags
- Star/fork counts
- Descriptions

### Blog Section

Fetches latest posts from Blogger API:

- Dynamic content loading
- Date formatting
- Tag system
- External links

### Contact Form

- Web3Forms integration
- Real-time validation
- Success/error feedback

## 📱 Responsive Design

- **Desktop**: Full glassmorphism effects, multi-column layouts
- **Tablet**: Adjusted grid layouts, touch-optimized
- **Mobile**: Single column, hamburger menu, optimized spacing

## 🌐 Deployment

### Vercel (Recommended for Frontend)

```bash
cd frontend
vercel
```

### Heroku (For Full-Stack)

```bash
heroku create your-portfolio
git push heroku main
```

### Docker

```bash
# Build and run
docker build -t portfolio .
docker run -p 3000:3000 portfolio
```

## 🎯 Roadmap

- [ ] Add project search/filter functionality
- [ ] Implement blog post pagination
- [ ] Add analytics dashboard
- [ ] Create admin panel for content management
- [ ] Add more animations and transitions
- [ ] Implement PWA features

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👤 Author

**Alidu Anthony**

- GitHub: [@Tony-tech-web](https://github.com/Tony-tech-web)
- Instagram: [@immnot_tony](https://www.instagram.com/immnot_tony)
- Email: tonyalidu@gmail.com

## 🙏 Acknowledgments

- Design inspiration from modern portfolio websites
- Glassmorphism effects from CSS-Tricks
- Font Awesome for icons
- Google Fonts for typography
- Web3Forms for contact form functionality

---

⭐ **Star this repo if you find it helpful!**

Built with ❤️ by Alidu Anthony
