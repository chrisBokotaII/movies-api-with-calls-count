const { Keys, sequelize } = require("../models");

const validateKey = async (req, res, next) => {
  try {
    const { key } = req.params;
    const keytofind = key.toString();
    const chckk = await Keys.findOne({
      where: {
        key: keytofind,
      },
    });
    if (!chckk) {
      return res.status(404).json({
        message: "key not found",
      });
    }
    next();
  } catch (error) {
    res.status(404).json({
      message: "key not found",
    });
  }
};

module.exports = validateKey;
