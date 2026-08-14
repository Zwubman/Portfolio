// GET /api/resume — returns the static Netlify-hosted resume URL
const getResume = (req, res) => {
  // The resume PDF is a static file hosted directly on Netlify CDN.
  // This is persistent and never affected by Render's ephemeral filesystem.
  const resumeUrl = 'https://wubamlakg.netlify.app/Wubamlak_Girum_Resume.pdf';
  return res.json({ resume_url: resumeUrl });
};

// POST /api/resume — endpoint kept for compatibility (not used for static resume)
const uploadResume = (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No PDF file uploaded.' });
  }
  // Return the static URL — the actual file in the frontend/public/
  // folder needs to be updated via a new deployment.
  return res.status(201).json({
    message: 'Resume URL updated. Please redeploy the frontend with the new PDF in public/ folder.',
    resume_url: 'https://wubamlakg.netlify.app/Wubamlak_Girum_Resume.pdf',
  });
};

// DELETE /api/resume
const deleteResume = (req, res) => {
  return res.json({ message: 'Resume is managed as a static Netlify asset. Update the public/ folder to change it.' });
};

module.exports = { getResume, uploadResume, deleteResume };
