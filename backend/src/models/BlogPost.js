const { pool } = require('../config/database');

class BlogPost {
  static async create(title, content, excerpt, tags, published = false) {
    const query = `
      INSERT INTO blog_posts (title, content, excerpt, tags, published, created_at, updated_at)
      VALUES ($1, $2, $3, $4, $5, NOW(), NOW())
      RETURNING *
    `;
    const values = [title, content, excerpt, tags, published];
    const result = await pool.query(query, values);
    return result.rows[0];
  }

  static async findAll(publishedOnly = true) {
    const query = publishedOnly 
      ? 'SELECT * FROM blog_posts WHERE published = true ORDER BY created_at DESC'
      : 'SELECT * FROM blog_posts ORDER BY created_at DESC';
    const result = await pool.query(query);
    return result.rows;
  }

  static async findById(id) {
    const query = 'SELECT * FROM blog_posts WHERE id = $1';
    const result = await pool.query(query, [id]);
    return result.rows[0];
  }

  static async update(id, updates) {
    const fields = [];
    const values = [];
    let paramCount = 1;

    Object.keys(updates).forEach(key => {
      fields.push(`${key} = $${paramCount}`);
      values.push(updates[key]);
      paramCount++;
    });

    const query = `
      UPDATE blog_posts 
      SET ${fields.join(', ')}, updated_at = NOW() 
      WHERE id = $${paramCount}
      RETURNING *
    `;
    values.push(id);

    const result = await pool.query(query, values);
    return result.rows[0];
  }

  static async delete(id) {
    const query = 'DELETE FROM blog_posts WHERE id = $1 RETURNING *';
    const result = await pool.query(query, [id]);
    return result.rows[0];
  }
}

module.exports = BlogPost;