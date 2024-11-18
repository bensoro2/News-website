// src/routes/newsRoutes.js

const express = require("express");
const newsController = require("../controllers/newsController");
const authMiddleware = require("../middleware/authMiddleware"); // นำเข้า middleware ที่ถูกต้อง
const upload = require("../middleware/upload"); // หากมีการอัพโหลดไฟล์

const router = express.Router();

// สร้างข่าวใหม่ (ต้องการการยืนยันตัวตน)
router.post(
  "/",
  authMiddleware,
  upload.single("image"),
  newsController.createNews
);

router.put(
  "/:id",
  authMiddleware,
  upload.single("image"),
  newsController.updateNews
);

// เส้นทางเฉพาะเจาะจง ควรอยู่ก่อนเส้นทาง dynamic
router.get("/related", newsController.getRelatedNews);
router.get("/type/:type", newsController.getNewsByType);

router.get("/", newsController.getAllNews);

router.get("/types", newsController.getTypes);

router.get("/count", newsController.getNewsCount);

// เส้นทาง dynamic
router.get("/:id", newsController.getNewsById);

router.delete("/:id", authMiddleware, newsController.deleteNews);

module.exports = router;
