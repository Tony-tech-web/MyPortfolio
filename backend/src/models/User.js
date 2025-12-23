const { pool } = require('../config/database');

class User {
  static async create(username, email, passwordHash, role = 'admin') {
    const query = `
      INSERT INTO users (username, email, password_hash, role, created_at, updated_at)
      VALUES ($1, $2, $3, $4, NOW(), NOW())
      RETURNING id, username, email, role, created_at
    `;
    const values = [username, email, passwordHash, role];
    const result = await pool.query(query, values);
    return result.rows[0];
  }

  static async findByEmail(email) {
    const query = 'SELECT * FROM users WHERE email = $1';
    const result = await pool.query(query, [email]);
    return result.rows[0];
  }

  static async findById(id) {
    const query = 'SELECT id, username, email, role, created_at FROM users WHERE id = $1';
    const result = await pool.query(query, [id]);
    return result.rows[0];
  }

  static async updateRefreshToken(id, refreshToken) {
    const query = 'UPDATE users SET refresh_token = $1, updated_at = NOW() WHERE id = $2';
    await pool.query(query, [refreshToken, id]);
  }

  static async findByRefreshToken(refreshToken) {
    const query = 'SELECT * FROM users WHERE refresh_token = $1';
    const result = await pool.query(query, [refreshToken]);
    return result.rows[0];
  }

  static async clearRefreshToken(id) {
    const query = 'UPDATE users SET refresh_token = NULL, updated_at = NOW() WHERE id = $1';
    await pool.query(query, [id]);
  }
}

module.exports = User;