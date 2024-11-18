// src/controllers/userController.js
const UserModel = require("../models/User");
const bcrypt = require("bcrypt");

const userModel = new UserModel();

class UserController {
  async createUser(req, res, next) {
    try {
      const { username, password, email } = req.body;

      // เข้ารหัสรหัสผ่านด้วย bcrypt
      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await userModel.createUser({
        username,
        password: hashedPassword,
        email,
      });
      res.status(201).json({
        id: user.id,
        username: user.username,
        email: user.email,
        createdAt: user.createdAt,
      }); // ไม่ส่งรหัสผ่านกลับมายังผู้ใช้
    } catch (error) {
      next(error);
    }
  }

  async getAllUsers(req, res, next) {
    try {
      const users = await userModel.getAllUsers();
      res.json(users);
    } catch (error) {
      next(error);
    }
  }

  async getUserById(req, res, next) {
    try {
      const user = await userModel.getUserById(parseInt(req.params.id));
      if (user) {
        // ไม่ส่งรหัสผ่านกลับมายังผู้ใช้
        const { password, ...sanitizedUser } = user;
        res.json(sanitizedUser);
      } else {
        res.status(404).json({ error: "User not found" });
      }
    } catch (error) {
      next(error);
    }
  }

  async updateUser(req, res, next) {
    try {
      const { password, ...data } = req.body;
      let updatedData = { ...data };

      if (password) {
        // เข้ารหัสรหัสผ่านใหม่
        const hashedPassword = await bcrypt.hash(password, 10);
        updatedData.password = hashedPassword;
      }

      const user = await userModel.updateUser(
        parseInt(req.params.id),
        updatedData
      );
      // ไม่ส่งรหัสผ่านกลับมายังผู้ใช้
      const { password: pwd, ...sanitizedUser } = user;
      res.json(sanitizedUser);
    } catch (error) {
      next(error);
    }
  }

  async deleteUser(req, res, next) {
    try {
      await userModel.deleteUser(parseInt(req.params.id));
      res.json({ message: "User deleted successfully" });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new UserController();
