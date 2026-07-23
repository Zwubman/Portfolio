const express = require('express');
const router = express.Router();
const { getExperiences, createExperience, updateExperience, deleteExperience } = require('../controllers/experienceController');
const { authMiddleware, adminMiddleware } = require('../utils/authMiddleware');

// Public
router.get('/', getExperiences);

// Admin protected
router.post('/', authMiddleware, adminMiddleware, createExperience);
router.put('/:id', authMiddleware, adminMiddleware, updateExperience);
router.delete('/:id', authMiddleware, adminMiddleware, deleteExperience);

module.exports = router;
