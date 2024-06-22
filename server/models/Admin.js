const mongoose = require("mongoose");
const adminSchema = new mongoose.Schema({
  username: String,
  password: String,
  auth: String,
});

module.exports = mongoose.model("Admin", adminSchema);
