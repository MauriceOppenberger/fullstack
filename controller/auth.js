const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.isAuthenticated = (req, res, next) => {
  const auth_token = req.cookies["jwt_token"];

  if (typeof auth_token !== "undefined" && auth_token) {
    return jwt.verify(auth_token, "supersayansecuresecret", (err, decoded) => {
      if (err) {
        console.log(err);
        err.statusCode = 500;
        throw err;
      }
      if (!decoded) {
        const error = new Error("Not authenticated");
        error.statusCode = 401;
        throw error;
      }
      const { firstName, lastName, id, email } = decoded;
      res.status(200).json({ user: { firstName, lastName, id, email } });
    });
  } else {
    //Forbitten
    console.log("no authentication token provided");
    res.status(403).json({ message: "No authentication token provided" });
    return;
  }
};

exports.signup = (req, res, next) => {
  console.log("signup");
  //Check if user already exist
  User.findOne({ email: req.body.email })
    .then(user => {
      if (user) {
        const error = new Error("user already exist");
        error.statusCode = 403;
        throw error;
      }

      //encrpyt password
      return bcrypt.hash(req.body.password, 12).then(hashedPassword => {
        //Create new user
        const user = new User({
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.email,
          password: hashedPassword
        });
        //Add user to database
        return user.save();
      });
    })
    .then(user => {
      console.log("user created");
      res.status(201).json({ message: "user created", user });
    })

    .catch(err => {
      return next(err);
    });
};

exports.login = (req, res, next) => {
  //find the user in the database
  User.findOne({ email: req.body.email })
    .then(user => {
      //throw err if no user exists
      if (!user) {
        const error = new Error(
          "No user found with this email, please use a valid email"
        );
        error.statusCode = 401;
        throw error;
      }
      //verify password
      return bcrypt
        .compare(req.body.password, user.password)

        .then(isMatch => {
          //throw err if password no match
          if (!isMatch) {
            const error = new Error("email or password invalid");
            error.statusCode = 403;
            throw error;
          }

          //Create JWT and set cookie
          const token = jwt.sign(
            {
              firstName: user.firstName,
              lastName: user.lastName,
              email: user.email,
              id: user._id.toString()
            },
            "supersayansecuresecret",
            {
              expiresIn: "1h"
            }
          );
          return token;
        })
        .then(token => {
          //return user if password correct
          res.status(200);
          res.cookie("jwt_token", token, {
            httpOnly: true,
            maxAge: 60 * 60 * 1000
          });
          res.json({ message: user });
        })
        .catch(err => console.log(err));
    })
    .catch(err => {
      return next(err);
    });
};
