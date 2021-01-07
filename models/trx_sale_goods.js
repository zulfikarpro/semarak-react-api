"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class trx_sale_goods extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      trx_sale_goods.belongsTo(models.trx_warehouse_stock, {
        foreignKey: "warehouse_stock_id",
        sourceKey: "id",
      });
    }
  }
  trx_sale_goods.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        unique: true,
      },
      warehouse_stock_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      point: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      qty: {
        type: DataTypes.INTEGER,
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      created_by: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      updated_by: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "trx_sale_goods",
      freezeTableName: true,
      timestamps: false,
    }
  );
  return trx_sale_goods;
};
