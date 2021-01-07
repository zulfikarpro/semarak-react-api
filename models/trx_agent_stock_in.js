"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class trx_agent_stock_in extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      trx_agent_stock_in.hasOne(models.mst_user, {
        foreignKey: "id",
        sourceKey: "updated_by",
        as: "updater",
      });
      trx_agent_stock_in.hasOne(models.mst_user, {
        foreignKey: "id",
        sourceKey: "created_by",
        as: "creator",
      });
    }
  }
  trx_agent_stock_in.init(
    {
      id: {
        type: DataTypes.INTEGER(10),
        unique: true,
        primaryKey: true,
        allowNull: false,
      },
      goods_id: {
        type: DataTypes.INTEGER(10),
        allowNull: false,
      },
      po_id: {
        type: DataTypes.INTEGER(10),
        allowNull: false,
      },
      scope_id: {
        type: DataTypes.INTEGER(10),
        allowNull: false,
      },
      in_qty: {
        type: DataTypes.INTEGER(10),
        allowNull: false,
        validate: {
          min: 1,
        },
      },
      dc_price: {
        type: DataTypes.FLOAT(),
        allowNull: false,
      },
      hpp_price: {
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
      modelName: "trx_agent_stock_in",
      freezeTableName: true,
      timestamps: false,
    }
  );
  return trx_agent_stock_in;
};
