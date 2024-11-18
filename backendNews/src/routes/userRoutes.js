// src/routes/userRoutes.js
const express = require("express");
const userController = require("../controllers/userController");

const router = express.Router();

// สร้างผู้ใช้ใหม่
router.post("/", userController.createUser);

// ดึงข้อมูลผู้ใช้ทั้งหมด
router.get("/", userController.getAllUsers);

// ดึงข้อมูลผู้ใช้ตาม ID
router.get("/:id", userController.getUserById);

// อัปเดตข้อมูลผู้ใช้
router.put("/:id", userController.updateUser);

// ลบผู้ใช้
router.delete("/:id", userController.deleteUser);

module.exports = router;
