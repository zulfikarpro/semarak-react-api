"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class trx_warehouse_so_detail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      trx_warehouse_so_detail.hasOne(models.trx_warehouse_so, {
        foreignKey: "id",
        sourceKey: "so_id",
      });
      trx_warehouse_so_detail.hasOne(models.trx_warehouse_stock, {
        foreignKey: "id",
        sourceKey: "warehouse_stock_id",
      });

      // trx_warehouse_so_detail.hasOne(models.mst_goods, {
      //   foreignKey: "id",
      //   sourceKey: "goods_id",
      // });
      // trx_warehouse_so_detail.hasMany(models.mst_goods_scope, {
      //   foreignKey: "goods_id",
      //   sourceKey: "goods_id",
      // });
      trx_warehouse_so_detail.hasOne(models.mst_user, {
        foreignKey: "id",
        sourceKey: "updated_by",
        as: "updater",
      });
      trx_warehouse_so_detail.hasOne(models.mst_user, {
        foreignKey: "id",
        sourceKey: "created_by",
        as: "creator",
      });
    }
  }
  trx_warehouse_so_detail.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        unique: true,
        autoIncrement: true,
      },
      so_id: {
        type: DataTypes.STRING(10),
        allowNull: false,
      },
      warehouse_stock_id: {
        type: DataTypes.INTEGER(10),
        allowNull: false,
      },
      qty: {
        type: DataTypes.INTEGER(10),
        allowNull: false,
      },
      price: {
        type: DataTypes.FLOAT(),
        allowNull: false,
      },
      sub_total: {
        type: DataTypes.FLOAT(),
        allowNull: false,
      },
      retur: {
        type: DataTypes.INTEGER(),
        allowNull: false,
      },
      created_by: { type: DataTypes.INTEGER(10), allowNull: false },
      created_at: { type: DataTypes.DATE, allowNull: false },
      updated_by: { type: DataTypes.INTEGER(10), allowNull: false },
      updated_at: { type: DataTypes.DATE, allowNull: false },
    },
    {
      sequelize,
      modelName: "trx_warehouse_so_detail",
      freezeTableName: true,
      timestamps: false,
    }
  );
  return trx_warehouse_so_detail;
};
