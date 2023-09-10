const express = require("express");
const moviesControllers = require("../controllers/moviesC");
const asynchadler = require("../middlewares/asynchadler");
const { checkAuth, checkAdmin } = require("../middlewares/checkAuth");
const validateKey = require("../middlewares/checkkey");

const Router = express.Router();

Router.post(
  "/create",
  asynchadler(checkAuth),
  asynchadler(checkAdmin("admin")),
  asynchadler(moviesControllers.createM)
);
Router.get("/movies/:key", checkAuth, validateKey, moviesControllers.getAll);
Router.get(
  "/movies/:id",
  asynchadler(checkAuth),
  asynchadler(checkAdmin("admin")),
  moviesControllers.getOneMovie
);
Router.put(
  "/movies/:id",
  asynchadler(checkAuth),
  asynchadler(checkAdmin("admin")),
  moviesControllers.updateMovie
);
Router.delete(
  "/movies/:id",
  asynchadler(checkAuth),
  asynchadler(checkAdmin("admin")),
  moviesControllers.deleteMovie
);

module.exports = Router;
