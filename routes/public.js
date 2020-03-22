const express = require("express");
const router = express.Router();
const publicController = require("../controller/public");

//Get all posts
router.get("/posts", publicController.getPosts);

// Get One Post by post id;
router.get("/posts/:id", publicController.getPostById);

// Get Comment by id
router.get("/comments/:id", publicController.getCommentById);

module.exports = router;
