const express = require("express");
const router = express.Router();
const authController = require("../controller/auth");
const isAuthorized = require("../middleware/auth");

router.post("/", isAuthorized, authController.isAuthenticated);
router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.post("/logout", isAuthorized, authController.logout);

module.exports = router;
