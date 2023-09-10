"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Keys, Plans }) {
      // define association here
      this.hasMany(Keys, {
        foreignKey: "user_id",
      });
      this.hasOne(Plans, {
        foreignKey: "user_id",
      });
    }
    toJSON() {
      return { ...this.get(), password: undefined };
    }
  }
  Users.init(
    {
      user_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notEmpty: true,
          notNull: true,
          min: [6, "Username must be at least 6 characters"],
          max: [30, "Username must be at most 30 characters"],
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
          min: [6, "Password must be at least 6 characters"],
          max: [12, "Password must be at most 12 characters"],

          notNull: true,
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notEmpty: true,
          notNull: true,
          isEmail: true,
        },
      },
      role: {
        type: DataTypes.STRING,
        allowNull: false,
        enum: ["user", "admin"],
      },
    },
    {
      sequelize,
      tableName: "users",
      modelName: "Users",
    }
  );
  return Users;
};
