const { verifyToken } = require("../utils/token");
const User = require("../models/user");

const isAuthorized = async (req, res, next) => {
  const auth_token = req.cookies["jwt_token"];

  if (typeof auth_token === "undefined" && !auth_token) {
    res.status(403).json({ message: "No authentication token provided" });
    return;
  }

  try {
    const user = await verifyToken(auth_token);
    const index = await User.findById(user.id);
    if (!index || index === -1) {
      const error = new Error("no user found");
      error.statusCode = 400;
      throw error;
    }
    req.user = user;
    next();
  } catch (err) {
    console.log(err);
    return next(err);
    // res.status(403).json({ message: "No authentication token provided" });
  }
};

module.exports = isAuthorized;
