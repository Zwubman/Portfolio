const express = require('express');
const router = express.Router();
const uploadResumeMW = require('../utils/uploadResume');
const {
  getResume,
  getResumeInfo,
  uploadResume: uploadResumeHandler,
  deleteResume
} = require('../controllers/resumeController');
const { authMiddleware } = require('../utils/authMiddleware');

// Public: stream the PDF binary directly (opens in browser)
router.get('/', getResume);

// Public: get JSON info about the resume (URL for frontend to link)
router.get('/info', getResumeInfo);

// Admin only: upload / replace resume
router.post('/', authMiddleware, uploadResumeMW.single('resume'), uploadResumeHandler);

// Admin only: delete resume
router.delete('/', authMiddleware, deleteResume);

module.exports = router;
