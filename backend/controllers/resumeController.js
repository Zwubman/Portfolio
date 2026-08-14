const { Setting } = require('../models');
const cloudinary = require('../configs/cloudinary_config');

const RESUME_KEY = 'resume_url';

// GET /api/resume — returns the stored Cloudinary resume URL from the database
const getResume = async (req, res) => {
  try {
    const setting = await Setting.findByPk(RESUME_KEY);
    return res.json({ resume_url: setting ? setting.value : null });
  } catch (err) {
    console.error('Error fetching resume:', err);
    return res.status(500).json({ message: 'Server error.' });
  }
};

// POST /api/resume — upload PDF to Cloudinary, persist the URL in PostgreSQL
const uploadResume = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No PDF file uploaded.' });
  }

  try {
    // req.file.path is the Cloudinary secure URL
    const resumeUrl = req.file.path;

    // Upsert the resume URL in the settings table so it survives server restarts
    await Setting.upsert({ key: RESUME_KEY, value: resumeUrl });

    return res.status(201).json({
      message: 'Resume uploaded successfully.',
      resume_url: resumeUrl,
    });
  } catch (err) {
    console.error('Error saving resume URL:', err);
    return res.status(500).json({ message: 'Failed to save resume URL.' });
  }
};

// DELETE /api/resume — delete from Cloudinary and clear DB
const deleteResume = async (req, res) => {
  try {
    await cloudinary.uploader.destroy('portfolio_resume/resume', { resource_type: 'raw' });
    await Setting.destroy({ where: { key: RESUME_KEY } });
    return res.json({ message: 'Resume deleted successfully.' });
  } catch (err) {
    console.error('Error deleting resume:', err);
    return res.status(500).json({ message: 'Failed to delete resume.' });
  }
};

module.exports = { getResume, uploadResume, deleteResume };
