//  Add your code here
const mongoose = require("mongoose");

// Esquema
const celebritySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  occupation: {
    type: String,
    required: true,
  },
  catchPhrase: {
    type: String,
    required: true,
  },
});

// ir a la base de datos

const Celebrity = mongoose.model("Celebrity", celebritySchema);

module.exports = Celebrity;
