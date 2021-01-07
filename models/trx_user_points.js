"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class trx_user_points extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      trx_user_points.hasOne(models.mst_user, {
        foreignKey: "id",
        sourceKey: "user_id",
      });
    }
  }
  trx_user_points.init(
    {
      id: {
        type: DataTypes.INTEGER(),
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        unique: true,
      },
      user_id: {
        type: DataTypes.INTEGER(10),
        allowNull: false,
      },
      point: {
        type: DataTypes.INTEGER(10),
        allowNull: false,
        defaultValue: 0,
      },
      last_point: {
        type: DataTypes.INTEGER(10),
        allowNull: false,
        defaultValue: 0,
      },
      traffic: {
        type: DataTypes.ENUM("credit", "debit"),
        allowNull: false,
      },
      trx_id: {
        type: DataTypes.INTEGER(),
        allowNull: false,
      },
      balance: {
        type: DataTypes.INTEGER(),
        allowNull: false,
      },
      created_by: { type: DataTypes.INTEGER(10), allowNull: false },
      created_at: { type: DataTypes.DATE, allowNull: false },
    },
    {
      sequelize,
      modelName: "trx_user_points",
      freezeTableName: true,
      timestamps: false,
    }
  );
  return trx_user_points;
};
