// src/app.js
const express = require("express");
const userRoutes = require("./routes/userRoutes");
const newsRoutes = require("./routes/newsRoutes");
const authRoutes = require("./routes/authRoutes");
const errorHandler = require("./middleware/errorHandler");
const postRoutes = require("./routes/postRoutes");
const uploadRoutes = require("./routes/uploadRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const settingRoutes = require("./routes/settingRoutes"); // เพิ่มบรรทัดนี้
const cors = require("cors");
const path = require("path");

const app = express();
app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());

// เสิร์ฟไฟล์สเตติกจากโฟลเดอร์ 'uploads'
app.use("/uploads", express.static(path.join(__dirname, "uploads")));


// Routes
app.use("/upload", uploadRoutes);
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/news", newsRoutes);
app.use("/posts", postRoutes);
app.use("/categories", categoryRoutes);
app.use("/settings", settingRoutes); // เพิ่มบรรทัดนี้

// Middleware สำหรับจัดการข้อผิดพลาด
app.use(errorHandler);

module.exports = app;
