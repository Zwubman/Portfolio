const express = require('express');
const router = express.Router();
const uploadResume = require('../utils/uploadResume');
const { getResume, uploadResume: uploadResumeHandler, deleteResume } = require('../controllers/resumeController');
const { protect } = require('../utils/authMiddleware');

// Public: get resume URL
router.get('/', getResume);

// Admin only: upload / replace resume
router.post('/', protect, uploadResume.single('resume'), uploadResumeHandler);

// Admin only: delete resume
router.delete('/', protect, deleteResume);

module.exports = router;
