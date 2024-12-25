const multer = require("multer");
const path = require("path");
const fs = require("fs");

const storage = multer.diskStorage({
  destination: (req, files, cb) => {
    const filePath = path.resolve(__dirname, "../users-images");
    if (!fs.existsSync(filePath)) {
      fs.mkdirSync(filePath, { recursive: true });
    }
    cb(null, filePath);
  },
  filename: (req, files, cb) => {
    cb(null, Date.now() + files.originalname);
  },
});

const upload = multer({ storage });

module.exports = upload;
