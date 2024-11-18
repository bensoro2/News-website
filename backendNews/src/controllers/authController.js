// src/controllers/authController.js
const UserModel = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userModel = new UserModel();

class AuthController {
  async login(req, res, next) {
    try {
      const { username, password } = req.body;

      // ตรวจสอบว่ามีผู้ใช้ที่มีชื่อผู้ใช้ดังกล่าวหรือไม่
      const user = await userModel.getUserByUsername(username);
      if (!user) {
        return res.status(400).json({ error: "Invalid username or password" });
      }

      // เปรียบเทียบรหัสผ่านที่เข้ารหัสกับรหัสผ่านที่ให้มา
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ error: "Invalid username or password" });
      }

      // สร้าง JWT Token
      const token = jwt.sign(
        { userId: user.id, username: user.username },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );

      res.json({ token });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new AuthController();
