const bodyParser = require("body-parser");
require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const zod = require("zod");
app.use(bodyParser.json());
const myschema = zod.string();
const jwt = require("jsonwebtoken");
const PORT = process.env.PORT || 3000;
//connceting to db;
const secret = process.env.secret;
const mongouri = process.env.Mongodburl;
mongoose.connect(``);
//defineing schema for admin
const adminschema = new mongoose.Schema({
  username: String,
  password: String,
  auth: String,
});
//definieing schema for user
const userschema = new mongoose.Schema({
  username: String,
  password: String,
  auth: String,
  addedBooks: [
    {
      //
      type: mongoose.Schema.Types.ObjectId,
      ref: "Book",
    },
  ],
});
//definening schema for Book
const bookschema = new mongoose.Schema({
  genre: String,
  descreption: String,
  imagelink: String,
  price: Number,
});
//
const Admin = mongoose.model("Admin", adminschema);
const User = mongoose.model("User", userschema);
const Books = mongoose.model("Books", bookschema);

//defining admin middleware for auth

function Adminmiddleware(req, res, next) {
  const username = myschema.parse(req.headers.username);
  const password = myschema.min(15).parse(req.headers.password);
  const auth = req.headers.authorization;
  User.findOne({ auth: auth }).then(function (value) {
    if (value) {
      next();
    } else {
      res.status(403).json({ msg: "inavlid admin" });
    }
  });
}

//defining user middleware for auth

function usermiddlware(req, res, next) {
  const username = myschema.parse(req.headers.username);
  const password = myschema.min(8).parse(req.headers.password);
  const auth = req.headers.authorization;
  User.findOne({ auth: auth }).then(function (value) {
    if (value) {
      next();
    } else {
      res.status(403).json({ msg: "inavlid admin" });
    }
  });
}

//posting
app.post("admin/signup", async (req, res) => {
  let username = req.body.username;
  let password = req.body.username;
  let auth = jwt.sign(
    {
      username: username,
      password: password,
      auth: auth,
    },
    secret
  );
  await Admin.create({
    username: username,
    password: password,
    auth: auth,
  });
  res.json({
    message: "admin created sucessufully",
  });
});
//opening a port for the server
const port = PORT;
app.listen(port, () => {
  console.log(`port is listening in ${port}`);
});
