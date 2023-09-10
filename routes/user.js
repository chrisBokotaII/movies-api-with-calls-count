const express = require("express");
const Router = express.Router();
const userControllers = require("../controllers/userC");
const asynchandler = require("../middlewares/asynchadler");
const { checkAuth, checkAdmin } = require("../middlewares/checkAuth");

Router.post("/signup", asynchandler(userControllers.signup));
Router.post("/login", asynchandler(userControllers.login));
Router.post(
  "/key",
  asynchandler(checkAuth),
  asynchandler(userControllers.getAkey)
);
Router.post("/subscribe", checkAuth, userControllers.subsribe);

module.exports = Router;
