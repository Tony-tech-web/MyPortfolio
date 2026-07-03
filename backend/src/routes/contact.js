const express = require('express');
const { z } = require('zod');
const Contact = require('../models/Contact');
const { authenticateToken, authorizeRole } = require('../middleware/auth');
const { registry, bearerAuth } = require('../config/swagger');

const router = express.Router();

// Validation schemas with OpenAPI metadata
const contactSchema = registry.register('ContactInput', z.object({
  name: z.string().min(1).max(100).openapi({ example: 'John Doe' }),
  email: z.string().email().openapi({ example: 'john@example.com' }),
  message: z.string().min(10).max(1000).openapi({ example: 'Hello, I would like to work with you!' })
}));

const contactResponseSchema = registry.register('ContactResponse', z.object({
  id: z.number().optional(),
  name: z.string(),
  email: z.string(),
  message: z.string(),
  is_read: z.boolean().optional(),
  created_at: z.string().optional()
}));

// POST /api/contact
registry.registerPath({
  method: 'post',
  path: '/api/contact',
  summary: 'Submit contact form (public)',
  tags: ['Contact'],
  request: {
    body: {
      content: {
        'application/json': { schema: contactSchema }
      }
    }
  },
  responses: {
    201: {
      description: 'Message sent successfully',
      content: {
        'application/json': {
          schema: z.object({
            message: z.string(),
            id: z.number().optional()
          })
        }
      }
    },
    400: { description: 'Bad request' }
  }
});

// Submit contact form (public)
router.post('/', async (req, res, next) => {
  try {
    const parsed = contactSchema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ error: parsed.error.errors[0].message });

    // Check if database is connected
    const { pool } = require('../config/database');
    try {
      await pool.query('SELECT 1');
      // Database is connected, save to database
      const contact = await Contact.create(parsed.data.name, parsed.data.email, parsed.data.message);
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

// GET /api/contact
registry.registerPath({
  method: 'get',
  path: '/api/contact',
  summary: 'Get all contacts (Admin only)',
  tags: ['Contact'],
  security: [{ [bearerAuth.name]: [] }],
  responses: {
    200: {
      description: 'List of all contacts',
      content: { 'application/json': { schema: z.array(contactResponseSchema) } }
    }
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

// PATCH /api/contact/{id}/read
registry.registerPath({
  method: 'patch',
  path: '/api/contact/{id}/read',
  summary: 'Mark contact as read (Admin only)',
  tags: ['Contact'],
  security: [{ [bearerAuth.name]: [] }],
  request: {
    params: z.object({ id: z.string() })
  },
  responses: {
    200: {
      description: 'Contact marked as read',
      content: { 'application/json': { schema: contactResponseSchema } }
    },
    404: { description: 'Contact not found' }
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

// DELETE /api/contact/{id}
registry.registerPath({
  method: 'delete',
  path: '/api/contact/{id}',
  summary: 'Delete contact (Admin only)',
  tags: ['Contact'],
  security: [{ [bearerAuth.name]: [] }],
  request: {
    params: z.object({ id: z.string() })
  },
  responses: {
    200: {
      description: 'Contact deleted successfully',
      content: { 'application/json': { schema: z.object({ message: z.string() }) } }
    },
    404: { description: 'Contact not found' }
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