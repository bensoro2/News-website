// src/routes/authRoutes.js
const express = require("express");
const authController = require("../controllers/authController");

const router = express.Router();

// เส้นทางสำหรับการล็อกอิน
router.post("/login", authController.login);

module.exports = router;
