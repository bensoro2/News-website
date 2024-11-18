// controllers/categoryController.js

const CategoryModel = require("../models/Category");
const categoryModel = new CategoryModel();

class CategoryController {
  async getAllCategories(req, res) {
    try {
      const categories = await categoryModel.getAllCategoriesWithPostCount();
      res.json(categories);
    } catch (error) {
      console.error("Error fetching categories:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
}

module.exports = new CategoryController();
