const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const { Users } = require("../models");

const { JWT_SECRET } = process.env;

exports.checkAuth = async (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }
  const token = req.headers.authorization.split(" ")[1];
  const decoded = jwt.verify(token, JWT_SECRET);
  const user = await Users.findOne({
    where: {
      user_id: decoded.id,
    },
  });
  req.currentUser = user;
  next();
};

exports.checkAdmin = (...role) => {
  return (req, res, next) => {
    if (!role.includes(req.currentUser.role)) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }
    next();
  };
};
