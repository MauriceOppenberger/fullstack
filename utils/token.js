const jwt = require("jsonwebtoken");
const SECRET = require("./constants");

exports.createToken = data => {
  const token = jwt.sign(data, SECRET, {
    expiresIn: "1h"
  });
  return token;
};

// we're creating an async function to make sure that
// callers don't forget to catch the exeption
exports.verifyToken = async token => {
  try {
    const decoded = jwt.verify(token, SECRET);
    return decoded;
  } catch (err) {
    throw err;
  }
};
