#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Portfolio CMS Setup Script');
console.log('==============================\n');

// Check if Node.js is installed
try {
  execSync('node --version', { stdio: 'pipe' });
  console.log('✅ Node.js is installed');
} catch (error) {
  console.log('❌ Node.js is not installed. Please install Node.js 18+ from https://nodejs.org/');
  process.exit(1);
}

// Check if PostgreSQL is running
const { Pool } = require('pg');
require('dotenv').config();

async function checkDatabase() {
  const pool = new Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    connectionTimeoutMillis: 5000
  });

  try {
    await pool.query('SELECT 1');
    console.log('✅ PostgreSQL is running and accessible');
    await pool.end();
    return true;
  } catch (error) {
    console.log('❌ PostgreSQL connection failed');
    console.log('Please ensure PostgreSQL is installed and running, or use Docker:');
    console.log('  docker run --name postgres-portfolio -e POSTGRES_DB=portfolio_db -e POSTGRES_USER=portfolio_user -e POSTGRES_PASSWORD=portfolio_password -p 5432:5432 -d postgres:15');
    await pool.end();
    return false;
  }
}

async function main() {
  // Check database connection
  const dbOk = await checkDatabase();
  if (!dbOk) {
    console.log('\n💡 Setup Instructions:');
    console.log('1. Install PostgreSQL or use Docker');
    console.log('2. Create database and user as specified in .env');
    console.log('3. Run: npm run init-db');
    console.log('4. Start backend: npm run dev');
    console.log('5. Start frontend: cd frontend && npm start');
    return;
  }

  // Install backend dependencies
  console.log('\n📦 Installing backend dependencies...');
  try {
    execSync('npm install', { stdio: 'inherit', cwd: path.join(__dirname, 'backend') });
    console.log('✅ Backend dependencies installed');
  } catch (error) {
    console.log('❌ Failed to install backend dependencies');
    return;
  }

  // Install frontend dependencies
  console.log('\n📦 Installing frontend dependencies...');
  try {
    execSync('npm install', { stdio: 'inherit', cwd: path.join(__dirname, 'frontend') });
    console.log('✅ Frontend dependencies installed');
  } catch (error) {
    console.log('❌ Failed to install frontend dependencies');
    return;
  }

  // Initialize database
  console.log('\n🗄️  Initializing database...');
  try {
    execSync('node init-db.js', { stdio: 'inherit', cwd: path.join(__dirname, 'backend') });
    console.log('✅ Database initialized');
  } catch (error) {
    console.log('❌ Failed to initialize database');
    return;
  }

  console.log('\n🎉 Setup complete!');
  console.log('\n🚀 To start the application:');
  console.log('1. Backend: cd backend && npm run dev');
  console.log('2. Frontend: cd frontend && npm start');
  console.log('\n📱 Access the application at:');
  console.log('- Frontend: http://localhost:3000');
  console.log('- Backend API: http://localhost:3001');
  console.log('- Admin Login: http://localhost:3000/admin');
  console.log('  Email: admin@portfolio.com');
  console.log('  Password: admin123');
}

main().catch(console.error);