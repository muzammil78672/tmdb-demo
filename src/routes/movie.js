const Movie = require("../models/movie");
const Verify = require("../middlewares/auth");

module.exports = app => {
  app.post("/movie", Verify, async (req, res) => {
    try {
      await Movie.updateOne(
        { movieId: req.body.movieId, userId: req.user.id },
        req.body,
        { upsert: true }
      );

      res.sendStatus(201);
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: error.message });
    }
  });

  app.get("/movie", Verify, async (req, res) => {
    try {
      let movies = await Movie.find({
        userId: req.user.id
      });

      res.status(200).send({ movies });
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  });
};
