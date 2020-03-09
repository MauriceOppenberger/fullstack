const express = require("express");
const router = express.Router();
const authController = require("../controller/auth");
const isAuthorized = require("../middleware/auth");
const { body } = require("express-validator");
const User = require("../models/user");

//Check if user is already authenticated
router.post("/", isAuthorized, authController.isAuthenticated);

//POST signup
router.post(
  "/signup",
  [
    body("firstName")
      .trim()
      .notEmpty(),
    body("lastName")
      .trim()
      .notEmpty(),
    body("email")
      .notEmpty()
      .normalizeEmail()
      .isEmail()
      .withMessage("Please Enter a valid Email")
      .custom(value => {
        return User.findOne({ email: value }).then(userDoc => {
          if (userDoc) {
            return Promise.reject("Email address already exists!");
          }
        });
      }),
    body(
      "password",
      "Password should not be empty, minimum five characters, at least one letter and one number"
    )
      .exists()
      .notEmpty()
      .isLength({ min: 5 })
      .matches(/^(?=.*\d)(?=.*[a-z])\w{5,}$/)
  ],
  authController.signup
);

//POST login
router.post(
  "/login",
  [
    body("email")
      .notEmpty()
      .normalizeEmail()
      .isEmail()
      .withMessage("Please Enter a valid Email"),
    body(
      "password",
      "Password should not be empty, minimum five characters, at least one letter and one number"
    )
      .exists()
      .notEmpty()
      .isLength({ min: 5 })
      .matches(/^(?=.*\d)(?=.*[a-z])\w{5,}$/)
  ],
  authController.login
);

//POST logout
router.post("/logout", isAuthorized, authController.logout);

module.exports = router;
