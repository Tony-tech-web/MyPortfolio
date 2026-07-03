const express = require('express');
const { z } = require('zod');
const BlogPost = require('../models/BlogPost');
const { authenticateToken, authorizeRole } = require('../middleware/auth');
const { registry, bearerAuth } = require('../config/swagger');

const router = express.Router();

// Validation schemas with OpenAPI metadata
const blogSchema = registry.register('BlogPostInput', z.object({
  title: z.string().min(1).max(200).openapi({ example: 'My First Post' }),
  content: z.string().min(50).openapi({ example: 'This is the long content of the post...' }),
  excerpt: z.string().min(10).max(300).openapi({ example: 'A brief summary.' }),
  tags: z.array(z.string()).openapi({ example: ['tech', 'life'] }),
  published: z.boolean().optional().openapi({ example: true })
}));

const blogResponseSchema = registry.register('BlogPostResponse', z.object({
  id: z.number().optional(),
  title: z.string(),
  content: z.string().optional(),
  excerpt: z.string(),
  tags: z.array(z.string()),
  published: z.boolean().optional(),
  created_at: z.string().optional()
}));

// GET /api/blog
registry.registerPath({
  method: 'get',
  path: '/api/blog',
  summary: 'Get all public blog posts (from Blogger API)',
  tags: ['Blog'],
  responses: {
    200: {
      description: 'List of public blog posts',
      content: { 'application/json': { schema: z.array(blogResponseSchema) } }
    }
  }
});

// Get all blog posts (public - from Blogger API)
router.get('/', async (req, res, next) => {
  try {
    const apiKey = process.env.BLOGGER_API_KEY;
    const blogId = process.env.BLOGGER_BLOG_ID;
    const url = `https://www.googleapis.com/blogger/v3/blogs/${blogId}/posts?key=${apiKey}`;

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Blogger API error: ${response.status}`);
    }
    const data = await response.json();

    const posts = data.items.map(post => ({
      id: post.id,
      title: post.title,
      excerpt: post.content ? post.content.replace(/<[^>]*>/g, '').substring(0, 300) + '...' : '',
      tags: post.labels || [],
      created_at: post.published
    }));

    res.json(posts);
  } catch (err) {
    next(err);
  }
});

// GET /api/blog/{id}
registry.registerPath({
  method: 'get',
  path: '/api/blog/{id}',
  summary: 'Get blog post by ID (public - only published)',
  tags: ['Blog'],
  request: {
    params: z.object({ id: z.string() })
  },
  responses: {
    200: {
      description: 'The requested blog post',
      content: { 'application/json': { schema: blogResponseSchema } }
    },
    404: { description: 'Post not found' }
  }
});

// Get blog post by ID (public - only published)
router.get('/:id', async (req, res, next) => {
  try {
    const post = await BlogPost.findById(req.params.id);
    if (!post || !post.published) return res.status(404).json({ error: 'Post not found' });
    res.json(post);
  } catch (err) {
    next(err);
  }
});

// GET /api/blog/admin/all
registry.registerPath({
  method: 'get',
  path: '/api/blog/admin/all',
  summary: 'Get all blog posts including drafts (Admin only)',
  tags: ['Blog'],
  security: [{ [bearerAuth.name]: [] }],
  responses: {
    200: {
      description: 'List of all blog posts',
      content: { 'application/json': { schema: z.array(blogResponseSchema) } }
    }
  }
});

// Get all blog posts (admin - including drafts)
router.get('/admin/all', authenticateToken, authorizeRole(['admin']), async (req, res, next) => {
  try {
    const posts = await BlogPost.findAll(false);
    res.json(posts);
  } catch (err) {
    next(err);
  }
});

// GET /api/blog/admin/{id}
registry.registerPath({
  method: 'get',
  path: '/api/blog/admin/{id}',
  summary: 'Get blog post by ID including drafts (Admin only)',
  tags: ['Blog'],
  security: [{ [bearerAuth.name]: [] }],
  request: {
    params: z.object({ id: z.string() })
  },
  responses: {
    200: {
      description: 'The requested blog post',
      content: { 'application/json': { schema: blogResponseSchema } }
    },
    404: { description: 'Post not found' }
  }
});

// Get blog post by ID (admin)
router.get('/admin/:id', authenticateToken, authorizeRole(['admin']), async (req, res, next) => {
  try {
    const post = await BlogPost.findById(req.params.id);
    if (!post) return res.status(404).json({ error: 'Post not found' });
    res.json(post);
  } catch (err) {
    next(err);
  }
});

// POST /api/blog
registry.registerPath({
  method: 'post',
  path: '/api/blog',
  summary: 'Create a new blog post (Admin only)',
  tags: ['Blog'],
  security: [{ [bearerAuth.name]: [] }],
  request: {
    body: {
      content: {
        'application/json': { schema: blogSchema }
      }
    }
  },
  responses: {
    201: {
      description: 'Blog post created',
      content: { 'application/json': { schema: blogResponseSchema } }
    },
    400: { description: 'Bad request' }
  }
});

// Create blog post (admin only)
router.post('/', authenticateToken, authorizeRole(['admin']), async (req, res, next) => {
  try {
    const parsed = blogSchema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ error: parsed.error.errors[0].message });

    const post = await BlogPost.create(
      parsed.data.title,
      parsed.data.content,
      parsed.data.excerpt,
      parsed.data.tags,
      parsed.data.published || false
    );
    res.status(201).json(post);
  } catch (err) {
    next(err);
  }
});

// PUT /api/blog/{id}
registry.registerPath({
  method: 'put',
  path: '/api/blog/{id}',
  summary: 'Update a blog post (Admin only)',
  tags: ['Blog'],
  security: [{ [bearerAuth.name]: [] }],
  request: {
    params: z.object({ id: z.string() }),
    body: {
      content: {
        'application/json': { schema: blogSchema }
      }
    }
  },
  responses: {
    200: {
      description: 'Blog post updated',
      content: { 'application/json': { schema: blogResponseSchema } }
    },
    400: { description: 'Bad request' },
    404: { description: 'Post not found' }
  }
});

// Update blog post (admin only)
router.put('/:id', authenticateToken, authorizeRole(['admin']), async (req, res, next) => {
  try {
    const parsed = blogSchema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ error: parsed.error.errors[0].message });

    const post = await BlogPost.update(req.params.id, parsed.data);
    if (!post) return res.status(404).json({ error: 'Post not found' });
    res.json(post);
  } catch (err) {
    next(err);
  }
});

// DELETE /api/blog/{id}
registry.registerPath({
  method: 'delete',
  path: '/api/blog/{id}',
  summary: 'Delete a blog post (Admin only)',
  tags: ['Blog'],
  security: [{ [bearerAuth.name]: [] }],
  request: {
    params: z.object({ id: z.string() })
  },
  responses: {
    200: {
      description: 'Post deleted successfully',
      content: { 'application/json': { schema: z.object({ message: z.string() }) } }
    },
    404: { description: 'Post not found' }
  }
});

// Delete blog post (admin only)
router.delete('/:id', authenticateToken, authorizeRole(['admin']), async (req, res, next) => {
  try {
    const post = await BlogPost.delete(req.params.id);
    if (!post) return res.status(404).json({ error: 'Post not found' });
    res.json({ message: 'Post deleted successfully' });
  } catch (err) {
    next(err);
  }
});

module.exports = router;