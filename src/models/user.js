const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  image: { type: String },
  password: { type: String, required: true },
  email: {
    type: String,
    unique: true,
    required: true,
    match: /\S+@\S+\.\S+/
  }
});

userSchema.pre("save", function(next) {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = bcrypt.hashSync(this.password, 10);
  next();
});

userSchema.methods.comparePassword = function(plaintext, callback) {
  return callback(bcrypt.compareSync(plaintext, this.password));
};

userSchema.set("toJSON", {
  transform: function(doc, ret, options) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
    delete ret.password;
  }
});

module.exports = mongoose.model("user", userSchema);
