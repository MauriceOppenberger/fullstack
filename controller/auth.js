const User = require("../models/user");
const Profile = require("../models/profile");
const bcrypt = require("bcrypt");

const { validationResult } = require("express-validator");
const { createToken } = require("../utils/token");

exports.isAuthenticated = async (req, res, next) => {
  res.status(200).json({
    user: {
      firstName: req.user.firstName,
      lastName: req.user.lastName,
      id: req.user.id,
      email: req.user.email,
    },
  });
};

exports.signup = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors);
      const error = new Error("Validation failed");
      error.statusCode = 422;
      error.data = errors.array();
      throw error;
    }

    //Check if user already exist
    const existingUser = await User.findOne({ email: req.body.email });

    if (existingUser) {
      const error = new Error("user already exist");
      error.statusCode = 403;
      throw error;
    }

    //encrpyt password
    const hashedPassword = await bcrypt.hash(req.body.password, 12);
    //Create new user
    const user = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: hashedPassword,
    });
    //Add user to database
    const newUser = await user.save();

    console.log("user created");
    res.status(201).json({ message: "user created", newUser });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    //Return for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error("Validation failed");
      error.statusCode = 422;
      error.data = errors.array();
      throw error;
    }
    //find the user in the database

    const user = await User.findOne({ email: req.body.email });
    //throw err if no user exists
    if (!user) {
      const error = new Error(
        "No user found with this email, please use a valid email"
      );
      error.statusCode = 401;
      throw error;
    }
    //verify password
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    //throw err if password no match
    if (!isMatch) {
      const error = new Error("email or password invalid");
      error.statusCode = 403;
      throw error;
    }
    const newUser = {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      id: user._id.toString(),
    };
    const token = createToken(newUser);

    //return user if password correct
    res.status(200);
    res.cookie("jwt_token", token, {
      httpOnly: true,
      maxAge: 60 * 60 * 1000,
    });
    res.json({ user: newUser });
  } catch (err) {
    next(err);
  }
};

exports.logout = async (req, res, next) => {
  // log user out and clear JWT TOKEN
  res.clearCookie("jwt_token");
  res.status(200).json({ message: "Logged out successfully" });
};
