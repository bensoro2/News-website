// src/controllers/newsController.js
const NewsModel = require("../models/News");
const { NewsType } = require("@prisma/client");

const newsModel = new NewsModel();

class NewsController {
  async createNews(req, res, next) {
    try {
      const { title, description, type } = req.body;
      const authorId = req.user ? req.user.userId : null;

      if (!authorId) {
        return res.status(401).json({ error: "Unauthorized" });
      }

      // ตรวจสอบว่า type ที่ส่งมาตรงกับค่าใน enum NewsType
      if (!Object.values(NewsType).includes(type)) {
        return res.status(400).json({ error: "Invalid news type" });
      }

      let imagePath = null;
      if (req.file) {
        imagePath = `/uploads/${req.file.filename}`;
      } else {
        imagePath = "/uploads/default-image.jpg";
      }

      const news = await newsModel.createNews({
        title,
        description,
        type,
        authorId,
        image: imagePath,
      });
      res.status(201).json(news);
    } catch (error) {
      console.error("Error creating news:", error);
      next(error);
    }
  }

  async getAllNews(req, res, next) {
    try {
      const limit = parseInt(req.query.limit) || 10;
      const type = req.query.type;
      const news = await newsModel.getAllNews(limit, type);
      res.json(news);
    } catch (error) {
      next(error);
    }
  }

  async getNewsById(req, res, next) {
    try {
      const idParam = req.params.id;
      console.log("req.params:", req.params);

      const id = parseInt(idParam, 10);
      console.log("Parsed id:", id);

      if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid ID parameter" });
      }

      const news = await newsModel.getNewsById(id);

      if (news) {
        // เพิ่มการนับวิว
        await newsModel.incrementView(id);
        res.json(news);
      } else {
        res.status(404).json({ error: "News not found" });
      }
    } catch (error) {
      console.error("Error in getNewsById:", error);
      next(error);
    }
  }

  async updateNews(req, res, next) {
    try {
      const id = parseInt(req.params.id);
      const { title, description, type } = req.body;

      // ตรวจสอบว่า type ที่ส่งมาตรงกับค่าใน enum NewsType
      if (type && !Object.values(NewsType).includes(type)) {
        return res.status(400).json({ error: "Invalid news type" });
      }

      let imagePath = null;
      if (req.file) {
        imagePath = `/uploads/${req.file.filename}`;
      }

      const dataToUpdate = {
        title,
        description,
        type,
      };

      if (imagePath) {
        dataToUpdate.image = imagePath;
      }

      const news = await newsModel.updateNews(id, dataToUpdate);
      res.json(news);
    } catch (error) {
      next(error);
    }
  }

  async deleteNews(req, res, next) {
    try {
      const id = parseInt(req.params.id);
      await newsModel.deleteNews(id);
      res.json({ message: "News deleted successfully" });
    } catch (error) {
      next(error);
    }
  }

  async getNewsByType(req, res, next) {
    try {
      const typeParam = req.params.type.replace("-", "_");
      if (!Object.values(NewsType).includes(typeParam)) {
        return res.status(400).json({ error: "Invalid news type" });
      }
      const news = await newsModel.getNewsByType(typeParam);
      res.json(news);
    } catch (error) {
      next(error);
    }
  }

  async getRelatedNews(req, res, next) {
    try {
      const type = req.query.type;
      const excludeId = parseInt(req.query.excludeId);
      const limit = parseInt(req.query.limit) || 2;

      if (!type || isNaN(excludeId)) {
        return res.status(400).json({ error: "Invalid query parameters" });
      }

      const news = await newsModel.getRelatedNews(type, excludeId, limit);
      res.json(news);
    } catch (error) {
      next(error);
    }
  }

  async getTypes(req, res, next) {
    try {
      const types = Object.values(NewsType);
      res.json(types);
    } catch (error) {
      next(error);
    }
  }

  async getNewsCount(req, res, next) {
    try {
      const count = await newsModel.getNewsCount();
      res.json({ count });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new NewsController();
