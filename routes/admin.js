const express = require("express");
const router = express.Router();
const adminController = require("../controller/admin");
const isAuthorized = require("../middleware/auth");
const { body } = require("express-validator");

// router.get("/posts", isAuthorized, adminController.getPosts);
router.get("/posts", isAuthorized, adminController.getPostsByUser);

// Create New Post
router.post(
  "/post",
  isAuthorized,
  [
    body("title", "title is required, field can not be empty")
      .trim()
      .notEmpty(),
    body("description", "description is required, field can not be empty")
      .trim()
      .notEmpty(),
    body("userId", "userId is required, field can not be empty")
      .trim()
      .notEmpty()
  ],
  adminController.createPost
);

module.exports = router;
