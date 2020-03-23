const jwt = require("jsonwebtoken");
const { SECRET } = require("./constants");

const JTW_SECRECT = process.env.SECRET || SECRET;

exports.createToken = data => {
  const token = jwt.sign(data, JTW_SECRECT, {
    expiresIn: "1h"
  });
  return token;
};

// we're creating an async function to make sure that
// callers don't forget to catch the exeption
exports.verifyToken = async token => {
  try {
    const decoded = jwt.verify(token, JTW_SECRECT);
    return decoded;
  } catch (err) {
    throw err;
  }
};
