const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");

// สร้างโฟลเดอร์สำหรับเก็บไฟล์อัปโหลด (ถ้ายังไม่มี)
const fs = require("fs");
const uploadDir = path.join(__dirname, "../uploads/");

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

// POST /upload - รับไฟล์จาก CKEditor
router.post("/", upload.single("upload"), (req, res) => {
  const file = req.file;

  // URL ที่เข้าถึงรูปภาพ
  const imageUrl = `http://localhost:3001/uploads/${file.filename}`;

  // CKEditor ต้องการส่งกลับข้อมูลแบบนี้
  res.json({
    uploaded: true,
    url: imageUrl,
  });
});

module.exports = router;
