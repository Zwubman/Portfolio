const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Ensure uploads/resume directory exists
const resumeDir = path.join(__dirname, '..', 'uploads', 'resume');
if (!fs.existsSync(resumeDir)) {
  fs.mkdirSync(resumeDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, resumeDir);
  },
  filename: function (req, file, cb) {
    // Always save as a fixed filename so there's only one resume at a time
    cb(null, 'resume.pdf');
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'application/pdf') {
    cb(null, true);
  } else {
    cb(new Error('Only PDF files are allowed.'), false);
  }
};

const uploadResume = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB max
  fileFilter,
});

module.exports = uploadResume;
