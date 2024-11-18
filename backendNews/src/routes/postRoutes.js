// src/routes/postRoutes.js

const express = require("express");
const postController = require("../controllers/postController");

const router = express.Router();

router.get("/count", postController.getPostCount);
// ...

module.exports = router;
