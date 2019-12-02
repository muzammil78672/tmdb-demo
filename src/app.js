const express = require("express");
const app = express();
var mongoose = require("mongoose");
const cors = require("cors");

const dbUrl = "mongodb://tmdb:Tmdb@123@ds351428.mlab.com:51428/tmdb";
// const dbUrl = "mongodb://localhost/tmdb";

mongoose.connect(dbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});
const PORT = process.env.PORT || 3000;

app.use(cors({ optionsSuccessStatus: 204 }));
app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ limit: "100mb", extended: true }));
app.use("/media", express.static("media"));

require("./routes/user")(app);
require("./routes/movie")(app);

app.listen(PORT, () => {
  console.log("server started on port :", PORT);
});
