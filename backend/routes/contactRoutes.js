const express = require('express');
const router = express.Router();
const { submitMessage, getMessages, markAsRead, deleteMessage } = require('../controllers/contactController');
const { authMiddleware, adminMiddleware } = require('../utils/authMiddleware');

// Public
router.post('/', submitMessage);

// Admin protected
router.get('/', authMiddleware, adminMiddleware, getMessages);
router.put('/:id/read', authMiddleware, adminMiddleware, markAsRead);
router.delete('/:id', authMiddleware, adminMiddleware, deleteMessage);

module.exports = router;
