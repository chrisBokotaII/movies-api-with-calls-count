const { Users, Keys, Plans } = require("../models");
const Helper = require("../helpers/encrypt");

class userController {
  static async signup(req, res) {
    try {
      const { username, password, email, role } = req.body;
      const hash = await Helper.hashPassword(password);
      const newUser = await Users.create({
        username,
        password: hash,
        email,
        role,
      });
      const token = Helper.tokenGenerator({
        id: newUser.user_id,
        role: newUser.role,
      });
      res.status(201).json({
        message: "created",
        data: newUser,
        token,
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  }
  static async login(req, res) {
    try {
      const { username, password } = req.body;
      const user = await Users.findOne({
        where: {
          username,
        },
      });

      const passwordCompare = await Helper.comparePassword(
        password,
        user.password
      );
      if (!user || !passwordCompare) {
        res.status(404).json({
          message: "password incorrect||username incorrect",
        });
      }
      const token = Helper.tokenGenerator({
        id: user.user_id,
        role: user.role,
      });
      res.status(200).json({
        message: "loggged in",
        data: user,
        token,
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  }
  static async getAkey(req, res) {
    const { user_id } = req.currentUser;
    let { key } = req.body;
    try {
      key = Helper.secretkeyGenerator();
      let api_key = await Keys.create({
        user_id,
        key,
      });
      res.status(200).json({
        message: "created",
        data: api_key,
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  }
  static async subsribe(req, res) {
    const { user_id } = req.currentUser;
    const { plan_name } = req.body;
    try {
      const planSub = await Plans.create({
        user_id,
        plan_name,
      });
      res.status(200).json({
        message: "created",
        data: planSub,
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  }
}
module.exports = userController;
