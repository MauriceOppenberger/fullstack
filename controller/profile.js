const Profile = require("../models/profile");
const User = require("../models/user");
const { validationResult } = require("express-validator");

// Get all profiles
exports.getProfiles = async (req, res, next) => {
  try {
  } catch (err) {
    console.log(err);
    next(err);
  }
};

//Get current users profile
exports.getProfileById = async (req, res, next) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id,
    }).populate("user", ["firstName", "lastName", "email"]);
    if (!profile) {
      const error = new Error("Please complete your profile");
      error.statusCode = 400;
      throw error;
    }
    res.status(200).json({ message: "Profile", profile });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

exports.createAndUpdate = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new Error("Validation failed");
    error.statusCode = 422;
    error.data = errors.array();
    throw error;
  }

  const {
    updatedTitle,
    updatedLocation,
    updatedSkills,
    updatedSummary,
    updatedGithub,
    updatedLinkedIn,
    updatedWebsite,
  } = req.body;
  //Initialize Profile object
  const profileFields = {};
  profileFields.user = req.user.id;
  if (updatedTitle) profileFields.title = updatedTitle;
  if (updatedLocation) profileFields.location = updatedLocation;
  if (updatedSummary) profileFields.summary = updatedSummary;

  // Convert skills string into array
  // romove all empty spaces and add one spase a beginning of string for better UI
  if (updatedSkills)
    profileFields.skills = updatedSkills.split(",").map((skill) => {
      skill.trim();
      return ` ${skill}`;
    });

  if (req.files) {
    if (req.files.file) {
      profileFields.file = req.files.file[0].path;
    } else {
      profileFields.file = null;
    }
    if (req.files.image) {
      profileFields.image = req.files.image[0].path;
    } else {
      profileFields.image = null;
    }
  } else {
    profileFields.file = null;
    profileFields.image = null;
  }

  //Build social object
  profileFields.social = {};
  if (updatedGithub) profileFields.social.github = updatedGithub;
  if (updatedLinkedIn) profileFields.social.linkedIn = updatedLinkedIn;
  if (updatedWebsite) profileFields.social.website = updatedWebsite;
  try {
    let profile = await Profile.findOne({ user: req.user.id });

    if (profile) {
      profile = await Profile.findOneAndUpdate(
        { user: req.user.id },
        { $set: profileFields },
        { new: true }
      );
      console.log(profile);
      return res.status(200).json({ message: "profile created", profile });
    }
    profile = new Profile(profileFields);

    await profile.save();

    res.status(201).json({ message: "profile created", profile });
  } catch (err) {
    console.log(err);
    next(err);
  }
};
