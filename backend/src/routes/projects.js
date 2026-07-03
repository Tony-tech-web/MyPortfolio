const express = require('express');
const { z } = require('zod');
const Project = require('../models/Project');
const { authenticateToken, authorizeRole } = require('../middleware/auth');
const { registry, bearerAuth } = require('../config/swagger');

const router = express.Router();

// Validation schemas with OpenAPI metadata
const projectSchema = registry.register('ProjectInput', z.object({
  title: z.string().min(1).max(100).openapi({ example: 'My Awesome Project' }),
  description: z.string().min(10).max(1000).openapi({ example: 'A highly scalable web application.' }),
  technologies: z.array(z.string()).openapi({ example: ['React', 'Node.js', 'PostgreSQL'] }),
  githubUrl: z.string().url().optional().or(z.literal('')).openapi({ example: 'https://github.com/user/repo' }),
  liveUrl: z.string().url().optional().or(z.literal('')).openapi({ example: 'https://example.com' }),
  imageUrl: z.string().url().optional().or(z.literal('')).openapi({ example: 'https://example.com/image.png' })
}));

const projectResponseSchema = registry.register('ProjectResponse', z.object({
  id: z.number().optional(),
  title: z.string(),
  description: z.string(),
  technologies: z.array(z.string()),
  github_url: z.string().optional().nullable(),
  live_url: z.string().optional().nullable(),
  image_url: z.string().optional().nullable(),
  created_at: z.string().optional()
}));

// GET /api/projects
registry.registerPath({
  method: 'get',
  path: '/api/projects',
  summary: 'Get all projects (public)',
  tags: ['Projects'],
  responses: {
    200: {
      description: 'List of all projects',
      content: { 'application/json': { schema: z.array(projectResponseSchema) } }
    }
  }
});

// Get all projects (public)
router.get('/', async (req, res, next) => {
  try {
    const projects = await Project.findAll();
    res.json(projects);
  } catch (err) {
    next(err);
  }
});

// GET /api/projects/{id}
registry.registerPath({
  method: 'get',
  path: '/api/projects/{id}',
  summary: 'Get project by ID (public)',
  tags: ['Projects'],
  request: {
    params: z.object({ id: z.string() })
  },
  responses: {
    200: {
      description: 'The requested project',
      content: { 'application/json': { schema: projectResponseSchema } }
    },
    404: { description: 'Project not found' }
  }
});

// Get project by ID (public)
router.get('/:id', async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ error: 'Project not found' });
    res.json(project);
  } catch (err) {
    next(err);
  }
});

// POST /api/projects
registry.registerPath({
  method: 'post',
  path: '/api/projects',
  summary: 'Create a new project (Admin only)',
  tags: ['Projects'],
  security: [{ [bearerAuth.name]: [] }],
  request: {
    body: {
      content: {
        'application/json': { schema: projectSchema }
      }
    }
  },
  responses: {
    201: {
      description: 'Project created',
      content: { 'application/json': { schema: projectResponseSchema } }
    },
    400: { description: 'Bad request' }
  }
});

// Create project (admin only)
router.post('/', authenticateToken, authorizeRole(['admin']), async (req, res, next) => {
  try {
    const parsed = projectSchema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ error: parsed.error.errors[0].message });

    const project = await Project.create(
      parsed.data.title,
      parsed.data.description,
      parsed.data.technologies,
      parsed.data.githubUrl || null,
      parsed.data.liveUrl || null,
      parsed.data.imageUrl || null
    );
    res.status(201).json(project);
  } catch (err) {
    next(err);
  }
});

// PUT /api/projects/{id}
registry.registerPath({
  method: 'put',
  path: '/api/projects/{id}',
  summary: 'Update a project (Admin only)',
  tags: ['Projects'],
  security: [{ [bearerAuth.name]: [] }],
  request: {
    params: z.object({ id: z.string() }),
    body: {
      content: {
        'application/json': { schema: projectSchema }
      }
    }
  },
  responses: {
    200: {
      description: 'Project updated',
      content: { 'application/json': { schema: projectResponseSchema } }
    },
    400: { description: 'Bad request' },
    404: { description: 'Project not found' }
  }
});

// Update project (admin only)
router.put('/:id', authenticateToken, authorizeRole(['admin']), async (req, res, next) => {
  try {
    const parsed = projectSchema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ error: parsed.error.errors[0].message });

    const project = await Project.update(req.params.id, parsed.data);
    if (!project) return res.status(404).json({ error: 'Project not found' });
    res.json(project);
  } catch (err) {
    next(err);
  }
});

// DELETE /api/projects/{id}
registry.registerPath({
  method: 'delete',
  path: '/api/projects/{id}',
  summary: 'Delete a project (Admin only)',
  tags: ['Projects'],
  security: [{ [bearerAuth.name]: [] }],
  request: {
    params: z.object({ id: z.string() })
  },
  responses: {
    200: {
      description: 'Project deleted successfully',
      content: { 'application/json': { schema: z.object({ message: z.string() }) } }
    },
    404: { description: 'Project not found' }
  }
});

// Delete project (admin only)
router.delete('/:id', authenticateToken, authorizeRole(['admin']), async (req, res, next) => {
  try {
    const project = await Project.delete(req.params.id);
    if (!project) return res.status(404).json({ error: 'Project not found' });
    res.json({ message: 'Project deleted successfully' });
  } catch (err) {
    next(err);
  }
});

module.exports = router;