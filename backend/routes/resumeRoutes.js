const express = require('express');
const router = express.Router();
const uploadResumeMW = require('../utils/uploadResume');
const { getResume, uploadResume: uploadResumeHandler, deleteResume } = require('../controllers/resumeController');
const { authMiddleware } = require('../utils/authMiddleware');

// Public: get resume URL
router.get('/', getResume);

// Admin only: upload / replace resume
router.post('/', authMiddleware, uploadResumeMW.single('resume'), uploadResumeHandler);

// Admin only: delete resume
router.delete('/', authMiddleware, deleteResume);

module.exports = router;
