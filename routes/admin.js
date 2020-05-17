const express = require("express");
const router = express.Router();
const adminController = require("../controller/admin");
const isAuthorized = require("../middleware/auth");
const { body } = require("express-validator");

// Get all Posts by user id;
router.get("/posts", isAuthorized, adminController.getPostsByUser);

// Create New Post
router.post(
  "/add-post",
  isAuthorized,
  [
    body("title", "title is required, field can not be empty")
      .trim()
      .notEmpty(),
    body("description", "description is required, field can not be empty")
      .trim()
      .notEmpty(),
    body("language", "programming language is required, field can not be empty")
      .trim()
      .notEmpty(),
    body("userId", "userId is required, field can not be empty")
      .trim()
      .notEmpty(),
  ],
  adminController.createPost
);

// Update New Post
router.put(
  "/edit-post/:id",
  isAuthorized,
  [
    body("updatedTitle", "title is required, field can not be empty")
      .trim()
      .notEmpty(),
    body(
      "updatedDescription",
      "description is required, field can not be empty"
    )
      .trim()
      .notEmpty(),
    body(
      "updatedLanguage",
      "programming language is required, field can not be empty"
    )
      .trim()
      .notEmpty(),
    body("userId", "userId is required, field can not be empty")
      .trim()
      .notEmpty(),
  ],
  adminController.editPost
);

// Create new Comment
router.post(
  "/posts/:id/comment",
  isAuthorized,
  [
    body("comment", "comment is required, field can not be empty")
      .trim()
      .notEmpty(),
  ],
  adminController.createComment
);

// Delete Post
router.delete("/posts/:id", isAuthorized, adminController.removePostById);

// Update Post

module.exports = router;
