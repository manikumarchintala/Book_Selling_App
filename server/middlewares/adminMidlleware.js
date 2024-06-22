const Admin = require("../models/Admin");
const { z } = require("zod");

const adminMiddleware = async (req, res, next) => {
  const username = z.string().parse(req.headers.username);
  const password = z.string().min(8).parse(req.headers.password);
  const auth = req.headers.authorization;
  const admin = await Admin.findOne({ auth });
  if (admin) {
    next();
  } else {
    res.status(403).json({ message: "Invalid admin" });
  }
};

module.exports = adminMiddleware;
