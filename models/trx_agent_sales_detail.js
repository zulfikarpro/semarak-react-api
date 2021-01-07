"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class trx_agent_sales_detail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // trx_agent_sales_detail.hasOne(models.mst_goods, {
      //   foreignKey: "id",
      //   sourceKey: "goods_id",
      // });
      // trx_agent_sales_detail.hasOne(models.mst_raw_goods, {
      //   foreignKey: "id",
      //   sourceKey: "sug_goods_id",
      // });
      trx_agent_sales_detail.belongsTo(models.trx_agent_stock, {
        foreignKey: "agent_stock_id",
        sourceKey: "id",
      });
      trx_agent_sales_detail.belongsTo(models.trx_agent_sales, {
        foreignKey: "sales_id",
        sourceKey: "id",
      });
      trx_agent_sales_detail.hasOne(models.mst_user, {
        foreignKey: "id",
        sourceKey: "created_by",
        as: "creator",
      });
    }
  }
  trx_agent_sales_detail.init(
    {
      id: {
        type: DataTypes.INTEGER(10),
        unique: true,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      sales_id: {
        type: DataTypes.INTEGER(10),
        allowNull: false,
      },
      agent_stock_id: {
        type: DataTypes.INTEGER(10),
        allowNull: false,
      },
      goods_id: {
        type: DataTypes.INTEGER(10),
        // allowNull: false,
      },
      sug_goods_id: {
        type: DataTypes.INTEGER(10),
        // allowNull: false,
      },
      price: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      qty: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      sub_total: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      created_by: { type: DataTypes.INTEGER(10), allowNull: false },
      created_at: { type: DataTypes.DATE, allowNull: false },
    },
    {
      sequelize,
      modelName: "trx_agent_sales_detail",
      freezeTableName: true,
      timestamps: false,
    }
  );
  return trx_agent_sales_detail;
};
