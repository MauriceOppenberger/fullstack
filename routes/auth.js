const express = require("express");
const router = express.Router();
const authController = require("../controller/auth");
const isAuth = require("../middleware/auth");

router.post("/", isAuth, authController.isAuthenticated);
router.post("/signup", authController.signup);
router.post("/login", authController.login);

module.exports = router;
