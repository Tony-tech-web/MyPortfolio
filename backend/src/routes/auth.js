const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { z } = require('zod');
const User = require('../models/User');
const { authenticateToken } = require('../middleware/auth');
const { registry, bearerAuth } = require('../config/swagger');

const router = express.Router();

// Validation schemas with OpenAPI metadata
const loginSchema = registry.register('LoginRequest', z.object({
  email: z.string().email().openapi({ example: 'user@example.com' }),
  password: z.string().min(6).openapi({ example: 'password123' })
}));

const refreshSchema = registry.register('RefreshRequest', z.object({
  refreshToken: z.string().openapi({ description: 'The refresh token' })
}));

registry.registerPath({
  method: 'post',
  path: '/api/auth/login',
  summary: 'User login',
  tags: ['Auth'],
  request: {
    body: {
      content: {
        'application/json': {
          schema: loginSchema
        }
      }
    }
  },
  responses: {
    200: {
      description: 'Successful login',
      content: {
        'application/json': {
          schema: z.object({
            accessToken: z.string(),
            refreshToken: z.string(),
            user: z.object({
              id: z.number(),
              username: z.string(),
              email: z.string(),
              role: z.string()
            })
          })
        }
      }
    },
    400: { description: 'Bad request' },
    401: { description: 'Invalid credentials' }
  }
});

// Login
router.post('/login', async (req, res, next) => {
  try {
    const parsed = loginSchema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ error: parsed.error.errors[0].message });

    const { email, password } = parsed.data;
    const user = await User.findByEmail(email);
    
    if (!user || !(await bcrypt.compare(password, user.password_hash))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const accessToken = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    const refreshToken = jwt.sign(
      { id: user.id },
      process.env.JWT_REFRESH_SECRET,
      { expiresIn: process.env.JWT_REFRESH_EXPIRES_IN }
    );

    await User.updateRefreshToken(user.id, refreshToken);

    res.json({
      accessToken,
      refreshToken,
      user: { id: user.id, username: user.username, email: user.email, role: user.role }
    });
  } catch (err) {
    next(err);
  }
});


registry.registerPath({
  method: 'post',
  path: '/api/auth/refresh',
  summary: 'Refresh access token',
  tags: ['Auth'],
  request: {
    body: {
      content: {
        'application/json': {
          schema: refreshSchema
        }
      }
    }
  },
  responses: {
    200: {
      description: 'Tokens refreshed successfully',
      content: {
        'application/json': {
          schema: z.object({
            accessToken: z.string(),
            refreshToken: z.string()
          })
        }
      }
    },
    400: { description: 'Bad request' },
    403: { description: 'Invalid refresh token' }
  }
});

// Refresh token
router.post('/refresh', async (req, res, next) => {
  try {
    const parsed = refreshSchema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ error: parsed.error.errors[0].message });

    const { refreshToken } = parsed.data;
    
    const user = await User.findByRefreshToken(refreshToken);
    if (!user) return res.status(403).json({ error: 'Invalid refresh token' });

    jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, async (err) => {
      if (err) return res.status(403).json({ error: 'Invalid refresh token' });

      const newAccessToken = jwt.sign(
        { id: user.id, email: user.email, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN }
      );

      const newRefreshToken = jwt.sign(
        { id: user.id },
        process.env.JWT_REFRESH_SECRET,
        { expiresIn: process.env.JWT_REFRESH_EXPIRES_IN }
      );

      await User.updateRefreshToken(user.id, newRefreshToken);

      res.json({ accessToken: newAccessToken, refreshToken: newRefreshToken });
    });
  } catch (err) {
    next(err);
  }
});

registry.registerPath({
  method: 'post',
  path: '/api/auth/logout',
  summary: 'User logout',
  tags: ['Auth'],
  security: [{ [bearerAuth.name]: [] }],
  responses: {
    200: {
      description: 'Logged out successfully',
      content: {
        'application/json': {
          schema: z.object({ message: z.string() })
        }
      }
    },
    401: { description: 'Unauthorized' }
  }
});

// Logout
router.post('/logout', authenticateToken, async (req, res, next) => {
  try {
    await User.clearRefreshToken(req.user.id);
    res.json({ message: 'Logged out successfully' });
  } catch (err) {
    next(err);
  }
});

registry.registerPath({
  method: 'get',
  path: '/api/auth/me',
  summary: 'Get current user',
  tags: ['Auth'],
  security: [{ [bearerAuth.name]: [] }],
  responses: {
    200: {
      description: 'Current user profile',
      content: {
        'application/json': {
          schema: z.object({
            id: z.number(),
            username: z.string(),
            email: z.string(),
            role: z.string()
          })
        }
      }
    },
    401: { description: 'Unauthorized' }
  }
});

// Get current user
router.get('/me', authenticateToken, async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    res.json(user);
  } catch (err) {
    next(err);
  }
});

module.exports = router;