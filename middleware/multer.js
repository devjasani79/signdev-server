const multer = require("multer");

// Use memory storage for in-memory PDF uploads
const storage = multer.memoryStorage();
const upload = multer({ storage });

module.exports = upload;

