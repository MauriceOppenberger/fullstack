const { verifyToken } = require("../utils/token");

const isAuthorized = async (req, res, next) => {
  const auth_token = req.cookies["jwt_token"];

  if (typeof auth_token === "undefined" && !auth_token) {
    res.status(403).json({ message: "No authentication token provided" });
    return;
  }

  try {
    const user = await verifyToken(auth_token);
    req.user = user;
    next();
  } catch (err) {
    return next(err);
    // res.status(403).json({ message: "No authentication token provided" });
  }
};

// const jwt = require("jsonwebtoken");

// module.exports = (req, res, next) => {
//   const auth_token = req.cookies["jwt_token"];

//   if (typeof auth_token !== "undefined" && auth_token) {
//     return jwt.verify(auth_token, "supersayansecuresecret", (err, decoded) => {
//       if (err) {
//         console.log(err);
//         err.statusCode = 500;
//         throw err;
//       }
//       if (!decoded) {
//         const error = new Error("Not authenticated");
//         error.statusCode = 401;
//         throw error;
//       }

//       next();
//     });
//   } else {
//     //Forbitten
//     console.log("no authentication token provided");
//     res.status(403).json({ message: "No authentication token provided" });
//     return;
//   }
// };
module.exports = isAuthorized;
