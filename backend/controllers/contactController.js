const { ContactMessage } = require('../models');

// POST /api/contact (Public)
const submitMessage = async (req, res) => {
  try {
    const { sender_name, sender_email, message } = req.body;

    if (!sender_name || !sender_email || !message) {
      return res.status(400).json({ message: 'Name, email, and message are required.' });
    }

    const contact = await ContactMessage.create({
      sender_name,
      sender_email,
      message,
    });

    res.status(201).json({ message: 'Message sent successfully!', id: contact.id });
  } catch (error) {
    console.error('Submit message error:', error);
    res.status(500).json({ message: 'Server error.' });
  }
};

// GET /api/contact (Admin)
const getMessages = async (req, res) => {
  try {
    const messages = await ContactMessage.findAll({ order: [['created_at', 'DESC']] });
    res.json(messages);
  } catch (error) {
    console.error('Get messages error:', error);
    res.status(500).json({ message: 'Server error.' });
  }
};

// PUT /api/contact/:id/read (Admin)
const markAsRead = async (req, res) => {
  try {
    const msg = await ContactMessage.findByPk(req.params.id);
    if (!msg) return res.status(404).json({ message: 'Message not found.' });

    await msg.update({ is_read: true });
    res.json(msg);
  } catch (error) {
    res.status(500).json({ message: 'Server error.' });
  }
};

// DELETE /api/contact/:id (Admin)
const deleteMessage = async (req, res) => {
  try {
    const msg = await ContactMessage.findByPk(req.params.id);
    if (!msg) return res.status(404).json({ message: 'Message not found.' });

    await msg.destroy();
    res.json({ message: 'Message deleted successfully.' });
  } catch (error) {
    console.error('Delete message error:', error);
    res.status(500).json({ message: 'Server error.' });
  }
};

module.exports = { submitMessage, getMessages, markAsRead, deleteMessage };
