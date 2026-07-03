const express = require('express');
const { z } = require('zod');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { authenticateToken, authorizeRole } = require('../middleware/auth');
const { registry, bearerAuth } = require('../config/swagger');

const router = express.Router();

// Validation schemas with OpenAPI metadata
const userSchema = registry.register('UserInput', z.object({
  username: z.string().min(3).max(50).openapi({ example: 'johndoe' }),
  email: z.string().email().openapi({ example: 'john@example.com' }),
  password: z.string().min(6).openapi({ example: 'securepassword123' }),
  role: z.enum(['admin', 'user']).optional().default('user').openapi({ example: 'admin' })
}));

const userUpdateSchema = registry.register('UserUpdateInput', z.object({
  username: z.string().min(3).max(50).openapi({ example: 'johndoe_updated' }),
  email: z.string().email().openapi({ example: 'john_updated@example.com' }),
  role: z.enum(['admin', 'user']).openapi({ example: 'user' })
}));

const userResponseSchema = registry.register('UserResponse', z.object({
  id: z.number().optional(),
  username: z.string(),
  email: z.string(),
  role: z.string(),
  created_at: z.string().optional()
}));

// GET /api/users
registry.registerPath({
  method: 'get',
  path: '/api/users',
  summary: 'Get all users (Admin only)',
  tags: ['Users'],
  security: [{ [bearerAuth.name]: [] }],
  responses: {
    200: {
      description: 'List of all users',
      content: { 'application/json': { schema: z.array(userResponseSchema) } }
    }
  }
});

// Get all users (admin only)
router.get('/', authenticateToken, authorizeRole(['admin']), async (req, res, next) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (err) {
    next(err);
  }
});

// GET /api/users/{id}
registry.registerPath({
  method: 'get',
  path: '/api/users/{id}',
  summary: 'Get user by ID (Admin only)',
  tags: ['Users'],
  security: [{ [bearerAuth.name]: [] }],
  request: {
    params: z.object({ id: z.string() })
  },
  responses: {
    200: {
      description: 'The requested user',
      content: { 'application/json': { schema: userResponseSchema } }
    },
    404: { description: 'User not found' }
  }
});

// Get user by ID (admin only)
router.get('/:id', authenticateToken, authorizeRole(['admin']), async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (err) {
    next(err);
  }
});

// POST /api/users
registry.registerPath({
  method: 'post',
  path: '/api/users',
  summary: 'Create a new user (Admin only)',
  tags: ['Users'],
  security: [{ [bearerAuth.name]: [] }],
  request: {
    body: {
      content: {
        'application/json': { schema: userSchema }
      }
    }
  },
  responses: {
    201: {
      description: 'User created',
      content: { 'application/json': { schema: userResponseSchema } }
    },
    400: { description: 'Bad request or email already exists' }
  }
});

// Create user (admin only)
router.post('/', authenticateToken, authorizeRole(['admin']), async (req, res, next) => {
  try {
    const parsed = userSchema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ error: parsed.error.errors[0].message });

    const existingUser = await User.findByEmail(parsed.data.email);
    if (existingUser) return res.status(400).json({ error: 'Email already exists' });

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(parsed.data.password, salt);

    const user = await User.create(
      parsed.data.username,
      parsed.data.email,
      passwordHash,
      parsed.data.role
    );
    res.status(201).json(user);
  } catch (err) {
    next(err);
  }
});

// PUT /api/users/{id}
registry.registerPath({
  method: 'put',
  path: '/api/users/{id}',
  summary: 'Update a user (Admin only)',
  tags: ['Users'],
  security: [{ [bearerAuth.name]: [] }],
  request: {
    params: z.object({ id: z.string() }),
    body: {
      content: {
        'application/json': { schema: userUpdateSchema }
      }
    }
  },
  responses: {
    200: {
      description: 'User updated',
      content: { 'application/json': { schema: userResponseSchema } }
    },
    400: { description: 'Bad request' },
    404: { description: 'User not found' }
  }
});

// Update user (admin only)
router.put('/:id', authenticateToken, authorizeRole(['admin']), async (req, res, next) => {
  try {
    const parsed = userUpdateSchema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ error: parsed.error.errors[0].message });

    const user = await User.update(req.params.id, parsed.data.username, parsed.data.email, parsed.data.role);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (err) {
    next(err);
  }
});

// DELETE /api/users/{id}
registry.registerPath({
  method: 'delete',
  path: '/api/users/{id}',
  summary: 'Delete a user (Admin only)',
  tags: ['Users'],
  security: [{ [bearerAuth.name]: [] }],
  request: {
    params: z.object({ id: z.string() })
  },
  responses: {
    200: {
      description: 'User deleted successfully',
      content: { 'application/json': { schema: z.object({ message: z.string() }) } }
    },
    404: { description: 'User not found' },
    400: { description: 'Cannot delete yourself' }
  }
});

// Delete user (admin only)
router.delete('/:id', authenticateToken, authorizeRole(['admin']), async (req, res, next) => {
  try {
    if (parseInt(req.params.id) === req.user.id) {
      return res.status(400).json({ error: 'Cannot delete yourself' });
    }
    const user = await User.delete(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
