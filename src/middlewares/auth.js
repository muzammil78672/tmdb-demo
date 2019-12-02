const jwt = require("jsonwebtoken");
const User = require("../models/user");

const JWT_SECRET = "cnlkZXVAMTIz";

module.exports = (req, res, next) => {
  try {
    let token = null;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer ")
    ) {
      token = req.headers.authorization.split(" ");
    }
    if (token) {
      jwt.verify(token[1], JWT_SECRET, async (err, payload) => {
        if (err) {
          if (err.name == "TokenExpiredError") {
            return res
              .status(401)
              .send({ status: 401, message: "Token expired", data: {} });
          }
          next(err);
        }
        if (payload && payload.hasOwnProperty("userId")) {
          const user = await User.findById(payload.userId);
          if (user) {
            req.user = user;
            next();
          } else {
            res
              .status(401)
              .send({ status: 401, message: "Invalid token", data: {} });
          }
        } else {
          res
            .status(401)
            .send({ status: 401, message: "Invalid token", data: {} });
        }
      });
    } else {
      res.status(401).send({ status: 401, message: "Invalid token", data: {} });
    }
  } catch (error) {
    next(error);
  }
};
