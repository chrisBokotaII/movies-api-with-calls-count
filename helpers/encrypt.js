const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
dotenv.config();
const { JWT_SECRET } = process.env;

class Helper {
  static hashPassword(password) {
    return bcrypt.hashSync(password, 10);
  }
  static comparePassword(password, hash) {
    return bcrypt.compareSync(password, hash);
  }

  static tokenGenerator(payload) {
    return jwt.sign(payload, JWT_SECRET, {
      expiresIn: "2d",
    });
  }
  static secretkeyGenerator() {
    const keylenth = 8;
    let key = "";
    for (let i = 0; i < keylenth; i++) {
      const randomNumder = Math.floor(Math.random() * 10);
      key += randomNumder.toString();
    }
    return key;
  }
}
module.exports = Helper;
