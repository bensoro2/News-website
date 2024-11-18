// src/models/User.js
const { PrismaClient } = require("@prisma/client");

class UserModel {
  constructor() {
    this.prisma = new PrismaClient();
  }

  async createUser(data) {
    return this.prisma.user.create({
      data,
    });
  }

  async getUserById(id) {
    return this.prisma.user.findUnique({
      where: { id },
      include: { news: true },
    });
  }

  async getUserByUsername(username) {
    // เพิ่มฟังก์ชันนี้
    return this.prisma.user.findUnique({
      where: { username },
    });
  }
  async updateUser(id, data) {
    return this.prisma.user.update({
      where: { id },
      data,
    });
  }
  async deleteUser(id) {
    return this.prisma.user.delete({
      where: { id },
    });
  }
  async getAllUsers() {
    return this.prisma.user.findMany();
  }

  async getUserCount() {
    return this.prisma.user.count();
  }
}
module.exports = UserModel;
