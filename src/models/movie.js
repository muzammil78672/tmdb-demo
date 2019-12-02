const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const movieSchema = new Schema({
  movieId: { type: String, required: true },
  posterImage: { type: String, required: true },
  title: { type: String, required: true },
  overview: { type: String, required: true },
  releaseDate: { type: String, required: true },
  popularity: { type: String, required: true },
  userId: { type: Schema.Types.ObjectId, ref: "user" },
  type: { type: String, enum: ["like", "dislike"] }
});

movieSchema.set("toJSON", {
  transform: function(doc, ret, options) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  }
});

module.exports = mongoose.model("movie", movieSchema);
