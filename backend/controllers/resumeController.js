const cloudinary = require('../configs/cloudinary_config');

// GET /api/resume — returns the public URL of the current resume (or null)
const getResume = async (req, res) => {
  try {
    const result = await cloudinary.api.resources({
      type: 'upload',
      prefix: 'portfolio_resume/resume',
      resource_type: 'image',
      max_results: 1
    });
    if (result.resources && result.resources.length > 0) {
      // Return the secure URL from Cloudinary
      return res.json({ resume_url: result.resources[0].secure_url });
    }
  } catch (err) {
    console.error('Error fetching resume from Cloudinary:', err);
  }
  return res.json({ resume_url: null });
};

// POST /api/resume — upload or replace the resume PDF
const uploadResume = (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No PDF file uploaded.' });
  }
  return res.status(201).json({
    message: 'Resume uploaded successfully.',
    resume_url: req.file.path,
  });
};

// DELETE /api/resume — delete the current resume
const deleteResume = async (req, res) => {
  try {
    await cloudinary.uploader.destroy('portfolio_resume/resume', { resource_type: 'image' });
    return res.json({ message: 'Resume deleted successfully.' });
  } catch (err) {
    console.error('Error deleting resume from Cloudinary:', err);
    return res.status(500).json({ message: 'Failed to delete resume.' });
  }
};

module.exports = { getResume, uploadResume, deleteResume };
