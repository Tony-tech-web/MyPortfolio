const express = require('express');
const Joi = require('joi');
const Project = require('../models/Project');
const { authenticateToken, authorizeRole } = require('../middleware/auth');

const router = express.Router();

// Validation schemas
const projectSchema = Joi.object({
  title: Joi.string().min(1).max(100).required(),
  description: Joi.string().min(10).max(1000).required(),
  technologies: Joi.array().items(Joi.string()).required(),
  githubUrl: Joi.string().uri().allow(''),
  liveUrl: Joi.string().uri().allow(''),
  imageUrl: Joi.string().uri().allow('')
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

// Create project (admin only)
router.post('/', authenticateToken, authorizeRole(['admin']), async (req, res, next) => {
  try {
    const { error } = projectSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const project = await Project.create(
      req.body.title,
      req.body.description,
      req.body.technologies,
      req.body.githubUrl,
      req.body.liveUrl,
      req.body.imageUrl
    );
    res.status(201).json(project);
  } catch (err) {
    next(err);
  }
});

// Update project (admin only)
router.put('/:id', authenticateToken, authorizeRole(['admin']), async (req, res, next) => {
  try {
    const { error } = projectSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const project = await Project.update(req.params.id, req.body);
    if (!project) return res.status(404).json({ error: 'Project not found' });
    res.json(project);
  } catch (err) {
    next(err);
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