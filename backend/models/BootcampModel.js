const mongoose = require("mongoose");

const bootcampSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "please provide a name for the bootcamp"],
    unique: true,
  },
  rating: {
    type: Number,
    required: [true, "Please provide a rating for the bootcamp"],
  },
  description: {
    type: String,
    required: [true, "Please provide a description of the bootcamp"],
  },
  price: {
    type: Number,
    required: [true, "Please provide a price for the bootcamp"],
  },
});

module.exports = mongoose.model("Bootcamp", bootcampSchema);
