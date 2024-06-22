const mongoose = require("mongoose");
const bookSchema = new mongoose.Schema({
  title: String,
  genre: String,
  author: String,
  description: String,
  imagelink: String,
  price: Number,
});
module.exports = mongoose.model("Book", bookSchema);
