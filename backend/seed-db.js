const { pool } = require('./src/config/database');

async function seedDatabase() {
  try {
    console.log('🌱 Seeding database with sample data...');

    // Sample projects
    const projects = [
      {
        title: 'Virtual Personal Stylist',
        description: 'A JavaFX desktop application that helps users select outfits based on weather conditions and personal preferences. Features a modern UI with weather API integration.',
        technologies: ['Java', 'JavaFX', 'Weather API', 'CSS'],
        github_url: 'https://github.com/tony-tech-web/virtual-stylist',
        live_url: null,
        image_url: null
      },
      {
        title: 'Blockchain Certificate Verifier',
        description: 'A secure Java-based system for academic certificate authentication using blockchain technology. Ensures certificate integrity and prevents forgery.',
        technologies: ['Java', 'Blockchain', 'Security', 'Database'],
        github_url: 'https://github.com/tony-tech-web/blockchain-verifier',
        live_url: null,
        image_url: null
      },
      {
        title: 'Attendance System',
        description: 'An automated attendance tracking tool using Streamlit and QR codes. Features real-time tracking and reporting for educational institutions.',
        technologies: ['Python', 'Streamlit', 'QR Codes', 'Data Analysis'],
        github_url: 'https://github.com/tony-tech-web/attendance-system',
        live_url: null,
        image_url: null
      }
    ];

    for (const project of projects) {
      await pool.query(`
        INSERT INTO projects (title, description, technologies, github_url, live_url, image_url, created_at, updated_at)
        VALUES ($1, $2, $3, $4, $5, $6, NOW(), NOW())
        ON CONFLICT DO NOTHING
      `, [project.title, project.description, project.technologies, project.github_url, project.live_url, project.image_url]);
    }

    // Sample blog posts
    const blogPosts = [
      {
        title: 'Building Secure APIs with JWT Authentication',
        content: 'Learn how to implement JWT authentication in Node.js applications with refresh token strategy for enhanced security.',
        excerpt: 'A comprehensive guide to implementing secure authentication in modern web applications using JWT tokens.',
        tags: ['Security', 'Node.js', 'JWT', 'API'],
        published: true
      },
      {
        title: 'React Best Practices for 2024',
        content: 'Explore the latest React patterns and best practices for building scalable and maintainable frontend applications.',
        excerpt: 'Stay updated with the latest React development practices and patterns for modern web development.',
        tags: ['React', 'Frontend', 'Best Practices', 'JavaScript'],
        published: true
      },
      {
        title: 'Database Design Principles',
        content: 'Understanding normalization, indexing, and query optimization for efficient database design.',
        excerpt: 'Learn the fundamental principles of database design and optimization techniques.',
        tags: ['Database', 'PostgreSQL', 'Performance', 'Design'],
        published: false
      }
    ];

    for (const post of blogPosts) {
      await pool.query(`
        INSERT INTO blog_posts (title, content, excerpt, tags, published, created_at, updated_at)
        VALUES ($1, $2, $3, $4, $5, NOW(), NOW())
        ON CONFLICT DO NOTHING
      `, [post.title, post.content, post.excerpt, post.tags, post.published]);
    }

    console.log('✅ Sample data seeded successfully');
    console.log('📊 Added 3 projects and 3 blog posts');

  } catch (error) {
    console.error('❌ Error seeding database:', error);
  } finally {
    await pool.end();
    process.exit(0);
  }
}

seedDatabase();