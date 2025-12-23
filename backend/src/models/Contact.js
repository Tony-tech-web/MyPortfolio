const { pool } = require('../config/database');

class Contact {
  static async create(name, email, message) {
    const query = `
      INSERT INTO contacts (name, email, message, created_at)
      VALUES ($1, $2, $3, NOW())
      RETURNING *
    `;
    const values = [name, email, message];
    const result = await pool.query(query, values);
    return result.rows[0];
  }

  static async findAll() {
    const query = 'SELECT * FROM contacts ORDER BY created_at DESC';
    const result = await pool.query(query);
    return result.rows;
  }

  static async markAsRead(id) {
    const query = 'UPDATE contacts SET read = true WHERE id = $1 RETURNING *';
    const result = await pool.query(query, [id]);
    return result.rows[0];
  }

  static async delete(id) {
    const query = 'DELETE FROM contacts WHERE id = $1 RETURNING *';
    const result = await pool.query(query, [id]);
    return result.rows[0];
  }
}

module.exports = Contact;