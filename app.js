const bodyParser = require("body-parser");
require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const zod = require("zod");
app.use(bodyParser.json());
const myschema = zod.string();
const jwt = require("jsonwebtoken");
const PORT = process.env.PORT;
//connceting to db;
const secret = process.env.secret;
const mongouri = process.env.Mongodburl;
mongoose.connect(`mongodb+srv://${mongouri}@cluster0.9769s5d.mongodb.net/`);
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
      //each type schema is associated with a objectid in db
      type: mongoose.Schema.Types.ObjectId,
      ref: "Book",
    },
  ],
});
//definening schema for Book
const bookschema = new mongoose.Schema({
  title: String,
  genre: String,
  author: String,
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
  const password = myschema.min(8).parse(req.headers.password);
  const auth = req.headers.authorization;
  Admin.findOne({ auth: auth }).then(function (value) {
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
  User.find({ password: password, username: username }).then(function (value) {
    if (value) {
      next();
    } else {
      res.status(403).json({ msg: "user" });
    }
  });
}
//posting to sign up for the email
app.post("/admin/signup", async (req, res) => {
  console.log("hooo");
  let username = req.headers.username;
  let password = req.headers.password;
  let auth = jwt.sign(
    {
      username: username,
      password: password,
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
//
app.post("/admin/signin", async (req, res) => {
  const username = myschema.parse(req.headers.username);
  const password = myschema.min(8).parse(req.headers.password);
  let newbook = await Admin.findOne({
    username: username,
  });
  res.json({
    auth: newbook.auth,
  });
});
//
app.get("/admin/view", Adminmiddleware, async (req, res) => {
  console.log("authworked");
  let response = await Books.find({});
  res.json({
    Books: response,
  });
});
//posting a
app.post("/admin/addbook", Adminmiddleware, async (req, res) => {
  const title = req.body.title;
  const author = req.body.author;
  const genre = req.body.genre;
  const descreption = req.body.descreption;
  const imagelink = req.body.imagelink;
  const price = req.body.price;
  let newbook = await Books.create({
    title: title,
    author: author,
    genre: genre,
    descreption: descreption,
    imagelink: imagelink,
    price: price,
  });
  res.json({
    message: "course created sucessfully",
    BookId: newbook._id,
  });
});
//creating user base
app.post("/user/signup", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  User.create({
    username: username,
    password: password,
  });
  res.json({
    msg: "user created",
  });
});
app.get("/users/view", usermiddlware, async (req, res) => {
  let response = await Books.find({});
  res.json({
    Books: response,
  });
});
//adding to cart
app.post("/books/:bookId", usermiddlware, async (req, res) => {
  // Implement adding book logic
  const bookId = req.params.bookId;
  const username = req.headers.username;
  console.log("here");
  await User.updateOne(
    {
      username: username,
    },
    {
      addedBooks: {
        $push: {
          addedBooks: bookId,
        },
      },
    }
  );
  res.json({
    msg: "purchase complete",
  });
});
//retriving data from the cart
app.get("/purchasedCourses", usermiddlware, async (req, res) => {
  // Implement fetching purchased courses logic
  const user = await User.findOne({
    username: req.headers.username,
  });
  const book = await Books.find({
    _id: {
      $in: User.bookId,
    },
  });
  res.json({
    book: Books,
  });
});
//opening a port for the server
const port = PORT;
app.listen(port, () => {
  console.log(`port is listening in ${port}`);
});
