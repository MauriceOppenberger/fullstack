const User = require("../models/user");
const bcrypt = require("bcrypt");

const { createToken, verifyToken } = require("../utils/token");

exports.isAuthenticated = async (req, res, next) => {
  res.status(200).json({
    user: {
      firstName: req.user.firstName,
      lastName: req.user.lastName,
      id: req.user.id,
      email: req.user.email
    }
  });
  // const auth_token = req.cookies["jwt_token"];

  // if (typeof auth_token === "undefined" && !auth_token) {
  //   res.status(403).json({ message: "No authentication token provided" });
  //   return;
  // }
  /*callback function 

    //   return jwt.verify(auth_token, "supersayansecuresecret", (err, decoded) => {
    //     if (err) {
    //       console.log(err);
    //       err.statusCode = 500;
    //       throw err;
    //     }
    //     if (!decoded) {
    //       const error = new Error("Not authenticated");
    //       error.statusCode = 401;
    //       throw error;
    //     }
    //     const { firstName, lastName, id, email } = decoded;
    //     res.status(200).json({ user: { firstName, lastName, id, email } });
    //   });
    // } else {
    //   //Forbitten
    //   console.log("no authentication token provided");
    //   res.status(403).json({ message: "No authentication token provided" });
    //   return;
    // }
    */

  // Promise return function
  // try {
  //   const user = await verifyToken(auth_token);
  //   res.status(200).json({
  //     user: {
  //       firstName: user.firstName,
  //       lastName: user.lastName,
  //       id: user.id,
  //       email: user.email
  //     }
  //   });
  // } catch (err) {
  //   return next(err);
  //   // res.status(403).json({ message: "No authentication token provided" });
  // }
};

exports.signup = async (req, res, next) => {
  console.log("signup");

  try {
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
      password: hashedPassword
    });
    //Add user to database
    const newUser = await user.save();

    console.log("user created");
    res.status(201).json({ message: "user created", newUser });
  } catch (err) {
    console.log(err);
    return next(err);
  }
};

exports.login = async (req, res, next) => {
  //find the user in the database
  try {
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

    // const token = await jwt.sign(
    //   {
    //     firstName: user.firstName,
    //     lastName: user.lastName,
    //     email: user.email,
    //     id: user._id.toString()
    //   },
    //   "supersayansecuresecret",
    //   {
    //     expiresIn: "1h"
    //   }
    // );
    //Create JWT and set cookie
    const token = createToken({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      id: user._id.toString()
    });

    //return user if password correct
    res.status(200);
    res.cookie("jwt_token", token, {
      httpOnly: true,
      maxAge: 60 * 60 * 1000
    });
    res.json({ message: user });
  } catch (err) {
    console.log(err);
    return next(err);
  }
};

exports.logout = async (req, res, next) => {
  // log user out and clear JWT TOKEN
  res.clearCookie("jwt_token");
  res.status(200).json({ message: "Logged out successfully" });
};
