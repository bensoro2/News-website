// src/middleware/upload.js

const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../uploads")); // กำหนดโฟลเดอร์สำหรับเก็บไฟล์อัพโหลด
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname); // กำหนดชื่อไฟล์
  },
});

const upload = multer({ storage });

module.exports = upload;
