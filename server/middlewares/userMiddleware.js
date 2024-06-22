const User = require("../models/User");
const { z } = require("zod");

const userMiddleware = async (req, res, next) => {
  const username = z.string().parse(req.headers.username);
  const password = z.string().min(8).parse(req.headers.password);
  const user = await User.findOne({ username, password });
  if (user) {
    next();
  } else {
    res.status(403).json({ message: "Invalid user" });
  }
};

module.exports = userMiddleware;
