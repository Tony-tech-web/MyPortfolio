const { pool } = require('./src/config/database');
const fs = require('fs');
const path = require('path');

async function initDatabase() {
  try {
    const schemaPath = path.join(__dirname, 'schema.sql');
    const schema = fs.readFileSync(schemaPath, 'utf8');
    
    await pool.query(schema);
    console.log('Database schema initialized successfully');
    
    // Create default admin user
    const bcrypt = require('bcryptjs');
    const User = require('./src/models/User');
    
    const existingUser = await User.findByEmail('admin@portfolio.com');
    if (!existingUser) {
      const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);
      await User.create('admin', 'admin@portfolio.com', hashedPassword, 'admin');
      console.log('Default admin user created: admin@portfolio.com / ' + process.env.ADMIN_PASSWORD);
    }
    
    process.exit(0);
  } catch (err) {
    console.error('Error initializing database:', err);
    process.exit(1);
  }
}

initDatabase();