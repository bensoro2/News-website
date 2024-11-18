// models/Category.js

const { PrismaClient } = require("@prisma/client");

class CategoryModel {
  constructor() {
    this.prisma = new PrismaClient();
  }

  async getAllCategoriesWithPostCount() {
    try {
      return await this.prisma.category.findMany({
        include: {
          _count: {
            select: { posts: true },
          },
        },
      });
    } catch (error) {
      console.error("Error querying categories:", error);
      throw error;
    }
  }
}

module.exports = CategoryModel;
