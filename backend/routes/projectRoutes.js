const express = require('express');
const router = express.Router();
const { getProjects, getProjectById, createProject, updateProject, deleteProject } = require('../controllers/projectController');
const { authMiddleware, adminMiddleware } = require('../utils/authMiddleware');
const upload = require('../utils/upload');

// Public
router.get('/', getProjects);
router.get('/:id', getProjectById);

// Admin protected
router.post('/', authMiddleware, adminMiddleware, upload.single('image'), createProject);
router.put('/:id', authMiddleware, adminMiddleware, upload.single('image'), updateProject);
router.delete('/:id', authMiddleware, adminMiddleware, deleteProject);

module.exports = router;
