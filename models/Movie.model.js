//  Add your code here
const mongoose = require("mongoose");

// esquema
const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  genre: {
    type: String,
    required: true,
  },
  plot: {
    type: String,
    required: true,
  },
  cast: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Celebrity",
    },
  ],
});

// ir a la base de datos

const Movie = mongoose.model("Movie", movieSchema);

module.exports = Movie;
