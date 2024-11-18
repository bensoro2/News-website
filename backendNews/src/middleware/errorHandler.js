// src/middleware/authMiddleware.js
const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  // ดึง Token จาก Header
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ error: "Authorization header missing" });
  }

  const token = authHeader.split(" ")[1]; // คาดว่าเป็นรูปแบบ "Bearer TOKEN"

  if (!token) {
    return res.status(401).json({ error: "Token missing" });
  }

  try {
    // ตรวจสอบและแยกข้อมูลจาก Token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // เก็บข้อมูลผู้ใช้ใน Request Object
    next();
  } catch (error) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
};

module.exports = authMiddleware;
