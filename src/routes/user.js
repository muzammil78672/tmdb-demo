const uuid = require("uuid");
const fs = require("fs");
const User = require("../models/user");
const Helper = require("../common/helper");

module.exports = app => {
  app.post("/register", async (req, res) => {
    try {
      let image = req.body.profileImage,
        imageBase64 = image.split(",")[1],
        type = image.split(";")[0].split("/")[1],
        imageLocation = "/media/" + uuid.v4() + "." + type;

      fs.writeFile(
        "." + imageLocation,
        new Buffer.from(imageBase64, "base64"),
        err => {
          if (err) {
            console.log(err);
            return res.status(500).send({ message: "something went wrong" });
          }
        }
      );

      req.body.image = imageLocation;
      // req.body.image = req.body.profileImage;

      let user = await User.create(req.body),
        token = Helper.generateToken(user.id);

      res.status(200).send({ user, token });
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: error.message });
    }
  });

  app.post("/login", async (req, res) => {
    try {
      let user = await User.findOne({
        email: req.body.email
      }).exec();
      if (!user) {
        return res.status(400).send({ message: "Invalid credentials" });
      }
      user.comparePassword(req.body.password, match => {
        if (!match) {
          res.status(400).send({ message: "Invalid credentials" });
        } else {
          let token = Helper.generateToken(user.id);
          res.status(200).send({ user, token });
        }
      });
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  });
};
