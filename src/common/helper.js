const jwt = require("jsonwebtoken");

const JWT_SECRET = "cnlkZXVAMTIz";

module.exports = {
  generateToken: userId => {
    return jwt.sign({ userId }, JWT_SECRET, {
      expiresIn: "60d"
    });
  }
};
