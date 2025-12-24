const express = require('express');
const Joi = require('joi');
const BlogPost = require('../models/BlogPost');
const { authenticateToken, authorizeRole } = require('../middleware/auth');

const router = express.Router();

// Validation schemas
const blogSchema = Joi.object({
  title: Joi.string().min(1).max(200).required(),
  content: Joi.string().min(50).required(),
  excerpt: Joi.string().min(10).max(300).required(),
  tags: Joi.array().items(Joi.string()).required(),
  published: Joi.boolean()
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

// Get all blog posts (admin - including drafts)
router.get('/admin/all', authenticateToken, authorizeRole(['admin']), async (req, res, next) => {
  try {
    const posts = await BlogPost.findAll(false);
    res.json(posts);
  } catch (err) {
    next(err);
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

// Create blog post (admin only)
router.post('/', authenticateToken, authorizeRole(['admin']), async (req, res, next) => {
  try {
    const { error } = blogSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const post = await BlogPost.create(
      req.body.title,
      req.body.content,
      req.body.excerpt,
      req.body.tags,
      req.body.published || false
    );
    res.status(201).json(post);
  } catch (err) {
    next(err);
  }
});

// Update blog post (admin only)
router.put('/:id', authenticateToken, authorizeRole(['admin']), async (req, res, next) => {
  try {
    const { error } = blogSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const post = await BlogPost.update(req.params.id, req.body);
    if (!post) return res.status(404).json({ error: 'Post not found' });
    res.json(post);
  } catch (err) {
    next(err);
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