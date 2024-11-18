// controllers/postController.js

const PostModel = require("../models/Post");
const postModel = new PostModel();

class PostController {
  async getPostCount(req, res) {
    try {
      const count = await postModel.getPostCount();
      res.json({ count });
    } catch (error) {
      console.error("Error fetching post count:", error);
      res.status(500).json({ error: "Error fetching post count" });
    }
  }
}

module.exports = new PostController();
