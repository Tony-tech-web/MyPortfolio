const express = require('express');
const Joi = require('joi');
const Contact = require('../models/Contact');
const { authenticateToken, authorizeRole } = require('../middleware/auth');

const router = express.Router();

// Validation schemas
const contactSchema = Joi.object({
  name: Joi.string().min(1).max(100).required(),
  email: Joi.string().email().required(),
  message: Joi.string().min(10).max(1000).required()
});

// Submit contact form (public)
router.post('/', async (req, res, next) => {
  try {
    const { error } = contactSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    // Check if database is connected
    const { pool } = require('../config/database');
    try {
      await pool.query('SELECT 1');
      // Database is connected, save to database
      const contact = await Contact.create(req.body.name, req.body.email, req.body.message);
      res.status(201).json({ message: 'Message sent successfully', id: contact.id });
    } catch (dbError) {
      // Database not connected, just return success (Web3Forms handles the email)
      console.log('Database not available, message handled by Web3Forms only');
      res.status(201).json({ message: 'Message sent successfully (Web3Forms only)' });
    }
  } catch (err) {
    next(err);
  }
});

// Get all contacts (admin only)
router.get('/', authenticateToken, authorizeRole(['admin']), async (req, res, next) => {
  try {
    const contacts = await Contact.findAll();
    res.json(contacts);
  } catch (err) {
    next(err);
  }
});

// Mark contact as read (admin only)
router.patch('/:id/read', authenticateToken, authorizeRole(['admin']), async (req, res, next) => {
  try {
    const contact = await Contact.markAsRead(req.params.id);
    if (!contact) return res.status(404).json({ error: 'Contact not found' });
    res.json(contact);
  } catch (err) {
    next(err);
  }
});

// Delete contact (admin only)
router.delete('/:id', authenticateToken, authorizeRole(['admin']), async (req, res, next) => {
  try {
    const contact = await Contact.delete(req.params.id);
    if (!contact) return res.status(404).json({ error: 'Contact not found' });
    res.json({ message: 'Contact deleted successfully' });
  } catch (err) {
    next(err);
  }
});

module.exports = router;