"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class trx_agent_stock extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      trx_agent_stock.belongsTo(models.mst_goods, {
        foreignKey: "goods_id",
        sourceKey: "id",
      });
      trx_agent_stock.belongsTo(models.mst_raw_goods, {
        foreignKey: "sug_goods_id",
        sourceKey: "id",
      });
      trx_agent_stock.hasMany(models.trx_warehouse_stock, {
        foreignKey: "goods_id",
        sourceKey: "goods_id",
      });
      trx_agent_stock.hasOne(models.mst_user, {
        foreignKey: "id",
        sourceKey: "created_by",
        as: "creator",
      });
      trx_agent_stock.hasOne(models.mst_user, {
        foreignKey: "id",
        sourceKey: "updated_by",
        as: "updater",
      });
      trx_agent_stock.hasMany(models.mst_uom_converter, {
        foreignKey: "goods_id",
        sourceKey: "goods_id",
      });
      trx_agent_stock.hasOne(models.mst_uom, {
        foreignKey: "id",
        sourceKey: "uom_id",
      });
      trx_agent_stock.belongsToMany(models.mst_uom, {
        through: models.mst_uom_converter,
        foreignKey: "goods_id",
        sourceKey: "goods_id",
        as: "uom_converter",
      });
    }
  }
  trx_agent_stock.init(
    {
      id: {
        type: DataTypes.INTEGER(10),
        unique: true,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      agent_id: {
        type: DataTypes.INTEGER(10),
        allowNull: false,
      },
      goods_id: {
        type: DataTypes.INTEGER(10),
        allowNull: false,
      },
      sug_goods_id: {
        type: DataTypes.INTEGER(10),
        allowNull: false,
      },
      price: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      stock: {
        type: DataTypes.INTEGER(10),
        allowNull: false,
      },
      uom_id: {
        type: DataTypes.INTEGER(10),
      },

      dc_price_ext: {
        type: DataTypes.INTEGER(20),
      },
      buff_stock: {
        type: DataTypes.INTEGER(10),
        defaultValue: 0,
      },
      created_by: { type: DataTypes.INTEGER(10), allowNull: false },
      created_at: { type: DataTypes.DATE, allowNull: false },
      updated_by: { type: DataTypes.INTEGER(10), allowNull: false },
      updated_at: { type: DataTypes.DATE, allowNull: false },
    },
    {
      sequelize,
      modelName: "trx_agent_stock",
      freezeTableName: true,
      timestamps: false,
    }
  );
  return trx_agent_stock;
};
