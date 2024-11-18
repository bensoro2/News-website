// src/models/News.js
const { PrismaClient, NewsType } = require("@prisma/client");

class NewsModel {
  constructor() {
    this.prisma = new PrismaClient();
  }

  async createNews(data) {
    return this.prisma.news.create({
      data: {
        title: data.title,
        description: data.description,
        type: data.type,
        image: data.image,
        author: {
          connect: { id: data.authorId },
        },
      },
    });
  }

  async getNewsById(id) {
    return this.prisma.news.findUnique({
      where: { id },
      include: { author: true },
    });
  }

  async updateNews(id, data) {
    return this.prisma.news.update({
      where: { id },
      data,
    });
  }

  async deleteNews(id) {
    return this.prisma.news.delete({
      where: { id },
    });
  }

  async getAllNews(limit, type) {
    const whereClause = type ? { type } : {};
    return this.prisma.news.findMany({
      take: limit,
      where: whereClause,
      orderBy: {
        createdAt: "desc",
      },
      include: {
        author: true,
      },
    });
  }

  async getNewsByType(type) {
    return this.prisma.news.findMany({
      where: { type },
      include: { author: true },
    });
  }

  async incrementView(id) {
    return this.prisma.news.update({
      where: { id },
      data: { view: { increment: 1 } },
    });
  }

  async getRelatedNews(type, excludeId, limit) {
    return this.prisma.news.findMany({
      where: {
        type,
        id: {
          not: excludeId,
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      take: limit,
      select: {
        id: true,
        title: true,
        image: true,
        createdAt: true,
      },
    });
  }

  async getNewsCount() {
    return this.prisma.news.count();
  }
}

module.exports = NewsModel;
