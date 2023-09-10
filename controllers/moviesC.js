const e = require("express");
const { Movies, Users, Plans } = require("../models");

const userRequestCount = {};
const userLastREqurstTIme = {};

class moviesControllers {
  static async getAll(req, res) {
    try {
      let RATE_LIMIT;
      const WINDOW_SIZE = 60 * 60 * 1000;
      const { user_id } = req.currentUser;
      const userplan = await Plans.findOne({
        where: {
          user_id,
        },
      });
      RATE_LIMIT = userplan.calls;
      const currentTime = new Date().getTime();
      if (!userLastREqurstTIme[user_id]) {
        userRequestCount[user_id] = 0;
        userLastREqurstTIme[user_id] = currentTime;
      }
      if (currentTime - userLastREqurstTIme[user_id] > WINDOW_SIZE) {
        userRequestCount[user_id] = 0;
        userLastREqurstTIme[user_id] = currentTime;
      }
      if (userRequestCount[user_id] >= RATE_LIMIT) {
        return res.status(429).json({
          message: "you are rate limited",
        });
      }
      userRequestCount[user_id]++;
      userLastREqurstTIme[user_id] = currentTime;
      console.log(userRequestCount);
      console.log(userLastREqurstTIme);

      const movies = await Movies.findAll();
      res.status(200).json({
        message: "success",
        data: movies,
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  }
  static async createM(req, res) {
    const { title, year, rating, genre, description, cover } = req.body;

    const newMovies = await Movies.create({
      title,
      year,
      rating,
      genre,
      description,
      cover,
    });
    res.status(200).json({
      messge: "created",
      data: newMovies,
    });
  }
  static async getOneMovie(req, res) {
    const { id } = req.params;
    try {
      const onemovie = await Movies.findOne({
        where: {
          id,
        },
      });
      res.status(200).json({
        message: "ok",
        data: onemovie,
      });
    } catch (error) {
      res.status(505).json({
        message: error.message,
      });
    }
  }

  static async updateMovie(req, res) {
    const { id } = req.params;
    const { title, year, rating, genre, description, cover } = req.body;
    await Movies.update(
      {
        title,
        year,
        rating,
        genre,
        description,
        cover,
      },
      {
        where: {
          id,
        },
      }
    );
    res.status(200).json({
      message: "updated",
    });
  }
  static async deleteMovie(req, res) {
    const { id } = req.params;
    const movie = await Movies.findByPk(id);
    movie.destroy();
  }
}
module.exports = moviesControllers;
