const express = require("express");
const router = express.Router();
const { getBooks, addBook } = require("../controllers/bookControllers");
const adminMiddleware = require("../middlewares/adminMidlleware");
const userMiddleware = require("../middlewares/userMiddleware");
const Admin = require("../models/Admin");
const Books = require("../models/Book");
const User = require("../models/User");
// Admin routes
router.post("/admin/signup", async (req, res) => {
  const { username, password } = req.body;
  const auth = jwt.sign({ username, password }, process.env.SECRET);
  await Admin.create({ username, password, auth });
  res.json({ message: "Admin created successfully" });
});

router.post("/admin/signin", async (req, res) => {
  console.log("hjooo");
  const { username, password } = req.body;
  const admin = await Admin.findOne({ username });
  res.json({ auth: Admin.auth });
});

router.get("/admin/view", adminMiddleware, async (req, res) => {
  const books = await Books.find({});
  res.json({ books });
});

router.post("/admin/addbook", adminMiddleware, async (req, res) => {
  const { title, genre, author, description, imagelink, price } = req.body;
  const book = await Books.create({
    title,
    genre,
    author,
    description,
    imagelink,
    price,
  });
  res.json({ message: "Book created successfully", bookId: book._id });
});
// User routes
router.post("/user/signup", async (req, res) => {
  const { username, password } = req.body;
  await User.create({ username, password });
  res.json({ message: "User created" });
});
router.get("/users/view", userMiddleware, async (req, res) => {
  const books = await Books.find({});
  res.json({ books });
});

router.post("/books/:bookId", userMiddleware, async (req, res) => {
  console.log("did it come here ?");
  const { bookId } = req.params;
  const { username } = req.headers;
  await User.updateOne({ username }, { $push: { addedBooks: bookId } });
  res.json({ message: "Book added to cart" });
});
router.get("/user/Addedbooks", userMiddleware, async (req, res) => {
  console.log("it came here!");
  const user = await User.findOne({ username: req.headers.username });
  const books = await Books.find({ _id: { $in: user.addedBooks } });
  res.json({ books });
});

module.exports = router;
