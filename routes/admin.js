const express = require("express");
const router = express.Router();
const adminController = require("../controller/admin");
const isAuthorized = require("../middleware/auth");

// router.get("/posts", isAuthorized, adminController.getPosts);
router.get("/posts", isAuthorized, adminController.getPostsByUser);

router.post("/post", isAuthorized, adminController.createPost);

module.exports = router;
