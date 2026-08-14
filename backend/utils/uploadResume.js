const multer = require('multer');

// Use memory storage — we'll save the PDF as base64 in PostgreSQL
const storage = multer.memoryStorage();

const uploadResume = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB max
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('Only PDF files are allowed.'), false);
    }
  }
});

module.exports = uploadResume;
