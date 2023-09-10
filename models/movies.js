"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Movies extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Movies.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notEmpty: true,
          notNull: true,
          min: [6, "Title must be at least 6 characters"],
          max: [30, "Title must be at most 30 characters"],
        },
      },
      year: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      rating: {
        type: DataTypes.STRING,
        defaultValue: "N/A",
      },
      genre: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      cover: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue:
          "https://www.technofoodie.com/wp-content/uploads/2019/11/placeholder-image.png",
      },
    },
    {
      sequelize,
      tableName: "movies",
      modelName: "Movies",
    }
  );
  return Movies;
};
