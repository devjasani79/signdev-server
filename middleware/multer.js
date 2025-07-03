const multer = require("multer");

// Use memory storage for in-memory PDF uploads
const storage = multer.memoryStorage();
const upload = multer({ storage });

module.exports = upload;

// This file defines the multer middleware for handling file uploads.
// It uses memory storage to store uploaded files in memory, which is suitable for processing PDF files