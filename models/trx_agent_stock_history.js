"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class trx_agent_stock_history extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      trx_agent_stock_history.hasOne(models.mst_user, {
        foreignKey: "id",
        sourceKey: "created_by",
        as: "creator",
      });
    }
  }
  trx_agent_stock_history.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        unique: true,
        autoIncrement: true,
      },
      agent_id: {
        type: DataTypes.INTEGER(20),
        // allowNull: false,
      },
      goods_id: {
        type: DataTypes.INTEGER(20),
        // allowNull: false,
      },
      sug_goods_id: {
        type: DataTypes.INTEGER(20),
        // allowNull: false,
      },
      agent_stock_id: {
        type: DataTypes.INTEGER(5),
        allowNull: false,
      },
      order_id: {
        type: DataTypes.INTEGER(5),
      },
      stock_old: {
        type: DataTypes.INTEGER(5),
        allowNull: false,
      },
      stock_new: {
        type: DataTypes.INTEGER(5),
        allowNull: false,
      },
      price_old: {
        type: DataTypes.INTEGER(),
        allowNull: false,
      },
      price_new: {
        type: DataTypes.INTEGER(),
        allowNull: false,
      },
      mode: {
        type: DataTypes.STRING(32),
        allowNull: false,
      },
      dc_price_old: {
        type: DataTypes.FLOAT,
      },
      dc_price_new: {
        type: DataTypes.FLOAT,
      },
      buff_stock_old: {
        type: DataTypes.INTEGER,
      },
      buff_stock_new: {
        type: DataTypes.INTEGER,
      },
      created_by: { type: DataTypes.INTEGER(10), allowNull: false },
      created_at: { type: DataTypes.DATE, allowNull: false },
    },
    {
      sequelize,
      modelName: "trx_agent_stock_history",
      freezeTableName: true,
      timestamps: false,
    }
  );
  return trx_agent_stock_history;
};
