// models/Post.js

const { PrismaClient } = require("@prisma/client");

class PostModel {
  constructor() {
    this.prisma = new PrismaClient();
  }
  async getPostCount() {
    return this.prisma.post.count();
  }
}

module.exports = PostModel;
