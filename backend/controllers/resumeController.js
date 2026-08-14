const { Setting } = require('../models');

const RESUME_KEY = 'resume_pdf_base64';
const RESUME_NAME_KEY = 'resume_filename';

// GET /api/resume — serves the PDF binary directly from the database
const getResume = async (req, res) => {
  try {
    const setting = await Setting.findByPk(RESUME_KEY);
    if (!setting || !setting.value) {
      return res.status(404).json({ resume_url: null, message: 'No resume uploaded yet.' });
    }

    const pdfBuffer = Buffer.from(setting.value, 'base64');

    // Serve as PDF so browser opens it inline — no caching so updates are immediate
    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'inline; filename="Wubamlak_Girum_Resume.pdf"',
      'Content-Length': pdfBuffer.length,
      'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0',
    });

    return res.send(pdfBuffer);
  } catch (err) {
    console.error('Error fetching resume:', err);
    return res.status(500).json({ message: 'Server error.' });
  }
};

// GET /api/resume/info — returns JSON info (url to view, filename)
const getResumeInfo = async (req, res) => {
  try {
    const setting = await Setting.findByPk(RESUME_KEY);
    if (!setting || !setting.value) {
      return res.json({ resume_url: null });
    }
    // Return the URL of the API endpoint itself as the resume_url
    const protocol = req.headers['x-forwarded-proto'] || req.protocol;
    const host = req.get('host');
    const resume_url = `${protocol}://${host}/api/resume`;
    return res.json({ resume_url });
  } catch (err) {
    console.error('Error fetching resume info:', err);
    return res.status(500).json({ message: 'Server error.' });
  }
};

// POST /api/resume — saves PDF as base64 in PostgreSQL
const uploadResume = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No PDF file uploaded.' });
  }

  try {
    const base64 = req.file.buffer.toString('base64');
    const filename = req.file.originalname || 'resume.pdf';

    // Upsert PDF data to settings table
    await Setting.upsert({ key: RESUME_KEY, value: base64 });
    await Setting.upsert({ key: RESUME_NAME_KEY, value: filename });

    const protocol = req.headers['x-forwarded-proto'] || req.protocol;
    const host = req.get('host');
    const resume_url = `${protocol}://${host}/api/resume`;

    return res.status(201).json({
      message: 'Resume uploaded successfully.',
      resume_url,
    });
  } catch (err) {
    console.error('Error saving resume:', err);
    return res.status(500).json({ message: 'Failed to save resume.' });
  }
};

// DELETE /api/resume — remove PDF from database
const deleteResume = async (req, res) => {
  try {
    await Setting.destroy({ where: { key: RESUME_KEY } });
    await Setting.destroy({ where: { key: RESUME_NAME_KEY } });
    return res.json({ message: 'Resume deleted successfully.' });
  } catch (err) {
    console.error('Error deleting resume:', err);
    return res.status(500).json({ message: 'Failed to delete resume.' });
  }
};

module.exports = { getResume, getResumeInfo, uploadResume, deleteResume };
