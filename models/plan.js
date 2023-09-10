"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Plans extends Model {
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
  Plans.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      user_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      plan_name: {
        type: DataTypes.STRING,
        enum: ["free", "premium"],
        defaultValue: "free",
      },
      calls: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
    },
    {
      hooks: {
        beforeCreate: (plan, options) => {
          if (plan.plan_name === "free") {
            plan.calls = 100;
          } else {
            plan.calls = 1000000;
          }
        },
        beforeUpdate: (plan, options) => {
          if (plan.plan_name === "free") {
            plan.calls = 100;
          } else {
            plan.calls = 1000000;
          }
        },
      },
      sequelize,
      tableName: "plans",
      modelName: "Plans",
    }
  );
  return Plans;
};
