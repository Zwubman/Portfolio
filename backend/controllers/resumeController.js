const path = require('path');
const fs = require('fs');

const resumePath = path.join(__dirname, '..', 'uploads', 'resume', 'resume.pdf');

// GET /api/resume — returns the public URL of the current resume (or null)
const getResume = (req, res) => {
  if (fs.existsSync(resumePath)) {
    const url = `${req.protocol}://${req.get('host')}/uploads/resume/resume.pdf`;
    return res.json({ resume_url: url });
  }
  return res.json({ resume_url: null });
};

// POST /api/resume — upload or replace the resume PDF
const uploadResume = (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No PDF file uploaded.' });
  }
  const url = `${req.protocol}://${req.get('host')}/uploads/resume/resume.pdf`;
  return res.status(201).json({
    message: 'Resume uploaded successfully.',
    resume_url: url,
  });
};

// DELETE /api/resume — delete the current resume
const deleteResume = (req, res) => {
  if (!fs.existsSync(resumePath)) {
    return res.status(404).json({ message: 'No resume found to delete.' });
  }
  fs.unlinkSync(resumePath);
  return res.json({ message: 'Resume deleted successfully.' });
};

module.exports = { getResume, uploadResume, deleteResume };
