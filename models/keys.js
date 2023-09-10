"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Keys extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Users }) {
      // define association here
      this.belongsTo(Users, {
        foreignKey: "user_id",
      });
    }
  }
  Keys.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      user_id: {
        type: DataTypes.UUID,
        notNull: true,
      },
      key: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notEmpty: true,
          notNull: true,
          min: [6, "Key must be at least 6 characters"],
        },
      },
    },
    {
      sequelize,
      tableName: "keys",
      modelName: "Keys",
    }
  );
  return Keys;
};
