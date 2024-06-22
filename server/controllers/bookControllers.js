const Books = require("../models/Book");

const getBooks = async (req, res) => {
  try {
    const books = await Books.find({});
    res.json({ books });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const addBook = async (req, res) => {
  try {
    const { title, genre, author, description, imagelink, price } = req.body;
    const book = await Books.create({
      title,
      genre,
      author,
      description,
      imagelink,
      price,
    });
    res.json({ message: "Book added successfully", book });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { getBooks, addBook };
