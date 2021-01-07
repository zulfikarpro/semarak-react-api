"use strict";
const { Model } = require("sequelize");
const { Op } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class temp_agent_sales extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // temp_agent_sales.belongsTo(models.mst_goods, {
      //   foreignKey: "id_goods",
      //   sourceKey: "id",
      // });
      // temp_agent_sales.hasMany(models.trx_agent_stock, {
      //   foreignKey: "agent_id",
      //   sourceKey: "agent_id",
      // });
      // temp_agent_sales.belongsTo(models.trx_warehouse_stock, {
      //   foreignKey: "id_goods",
      //   sourceKey: "goods_id",
      // });
      temp_agent_sales.hasOne(models.mst_user, {
        foreignKey: "id",
        sourceKey: "created_by",
        as: "creator",
      });
      temp_agent_sales.hasOne(models.mst_user, {
        foreignKey: "id",
        sourceKey: "updated_by",
        as: "updater",
      });
      temp_agent_sales.belongsTo(models.trx_agent_stock, {
        foreignKey: "stock_id",
        sourceKey: "id",
      });
      temp_agent_sales.belongsTo(models.trx_warehouse_stock, {
        foreignKey: "stock_id",
        sourceKey: "id",
      });
    }
  }
  temp_agent_sales.init(
    {
      id: {
        type: DataTypes.INTEGER(10),
        unique: true,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      agent_id: {
        type: DataTypes.INTEGER(10),
        allowNull: false,
      },
      // id_goods: {
      //   type: DataTypes.INTEGER(10),
      //   allowNull: false,
      // },
      // sug_goods_id: {
      //   type: DataTypes.INTEGER(10),
      //   allowNull: false,
      // },
      // uom_id: {
      //   type: DataTypes.INTEGER(10),
      // },
      // goods_price: {
      //   type: DataTypes.FLOAT(10),
      //   allowNull: false,
      // },
      qty: {
        type: DataTypes.INTEGER(10),
        allowNull: false,
        // validate: {
        //   min: {
        //     args: 1,
        //     msg: "aw",
        //   },
        //   isNumeric: true,
        // },
      },
      stock_id: {
        type: DataTypes.INTEGER(10),
        unique: true,
      },
      status: {
        type: DataTypes.ENUM("waiting", "paid"),
        allowNull: false,
      },
      type: {
        type: DataTypes.ENUM("buy", "sale"),
        allowNull: false,
      },
      sub_total: {
        type: DataTypes.VIRTUAL,
        get() {
          return (
            this.qty *
            (this.trx_agent_stock
              ? this.trx_agent_stock.price
              : this.trx_warehouse_stock
              ? this.trx_warehouse_stock.dc_price
              : 0)
          );
        },
      },
      created_by: { type: DataTypes.INTEGER(10), allowNull: false },
      created_at: { type: DataTypes.DATE(), allowNull: false },
      updated_by: { type: DataTypes.INTEGER(10), allowNull: false },
      updated_at: { type: DataTypes.DATE(), allowNull: false },
    },
    {
      sequelize,
      modelName: "temp_agent_sales",
      freezeTableName: true,
      timestamps: false,
    }
  );
  return temp_agent_sales;
};
