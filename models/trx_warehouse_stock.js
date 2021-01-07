"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class trx_warehouse_stock extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      trx_warehouse_stock.hasOne(models.mst_goods_price, {
        foreignKey: "goods_id",
        sourceKey: "goods_id",
      });
      trx_warehouse_stock.hasOne(models.mst_goods, {
        foreignKey: "id",
        sourceKey: "goods_id",
      });
      trx_warehouse_stock.hasMany(models.trx_agent_stock, {
        foreignKey: "goods_id",
        sourceKey: "goods_id",
      });
      // trx_warehouse_stock.hasOne(models.temp_agent_sales, {
      //   foreignKey: "id_goods",
      //   sourceKey: "goods_id",
      // });
      trx_warehouse_stock.hasMany(models.mst_goods_scope, {
        foreignKey: "warehouse_stock_id",
        sourceKey: "id",
      });
      trx_warehouse_stock.hasOne(models.mst_user, {
        foreignKey: "id",
        sourceKey: "updated_by",
        as: "updater",
      });
      trx_warehouse_stock.hasOne(models.mst_user, {
        foreignKey: "id",
        sourceKey: "created_by",
        as: "creator",
      });
      trx_warehouse_stock.hasOne(models.mst_uom, {
        foreignKey: "id",
        sourceKey: "uom_id",
      });
    }
  }
  trx_warehouse_stock.init(
    {
      id: {
        type: DataTypes.INTEGER(10),
        unique: true,
        primaryKey: true,
        allowNull: false,
      },
      warehouse_id: {
        type: DataTypes.INTEGER(10),
        allowNull: false,
      },
      goods_id: {
        type: DataTypes.INTEGER(10),
        allowNull: false,
      },
      stock: {
        type: DataTypes.INTEGER(10),
        allowNull: false,
      },
      uom_id: {
        type: DataTypes.INTEGER(10),
      },
      po_price: {
        type: DataTypes.FLOAT(),
        allowNull: false,
      },
      dc_margin: {
        type: DataTypes.FLOAT(),
        allowNull: false,
      },
      dc_price: {
        type: DataTypes.FLOAT(),
        allowNull: false,
      },
      created_by: { type: DataTypes.INTEGER(10), allowNull: false },
      created_at: { type: DataTypes.DATE, allowNull: false },
      updated_by: { type: DataTypes.INTEGER(10), allowNull: false },
      updated_at: { type: DataTypes.DATE, allowNull: false },
    },
    {
      sequelize,
      modelName: "trx_warehouse_stock",
      freezeTableName: true,
      timestamps: false,
    }
  );
  return trx_warehouse_stock;
};
