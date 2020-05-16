const express = require("express");
const router = express.Router();
const profileController = require("../controller/profile");
const isAuthorized = require("../middleware/auth");
const fileUpload = require("../middleware/file-upload");
const imageUpload = require("../middleware/image-upload");
const { body } = require("express-validator");

// Get current user profile
router.get("/", isAuthorized, profileController.getProfileById);

// Create or update current user profile
router.post(
  "/",
  isAuthorized,
  //   imageUpload.fields([
  //     { name: "file", maxCount: 1 },
  //     { name: "image", maxCount: 1 },
  //   ]),

  // use array in order to updload multiple files
  imageUpload.fields([
    { name: "file", maxCount: 1 },
    { name: "image", maxCount: 1 },
  ]),
  [
    body("updatedTitle", "title is required, field can not be empty")
      .trim()
      .notEmpty(),
    body("updatedLocation", "location is required, field can not be empty")
      .trim()
      .notEmpty(),
  ],
  profileController.createAndUpdate
);

//Get all user profiles
router.get("/all", profileController.getProfiles);
module.exports = router;
