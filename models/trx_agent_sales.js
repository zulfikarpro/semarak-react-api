"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class trx_agent_sales extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      trx_agent_sales.hasMany(models.trx_agent_sales_detail, {
        foreignKey: "sales_id",
        sourceKey: "id",
        as: "sales",
      });
      trx_agent_sales.belongsTo(models.mst_agent, {
        foreignKey: "agent_id",
        sourceKey: "id",
      });
      trx_agent_sales.hasOne(models.mst_user, {
        foreignKey: "id",
        sourceKey: "created_by",
        as: "creator",
      });
      trx_agent_sales.hasOne(models.mst_user, {
        foreignKey: "id",
        sourceKey: "updated_by",
        as: "updater",
      });
    }
  }
  trx_agent_sales.init(
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
      payment_id: {
        type: DataTypes.INTEGER(10),
        allowNull: false,
      },
      total: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      discount: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      pay: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      change: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      created_by: { type: DataTypes.INTEGER(10), allowNull: false },
      created_at: { type: DataTypes.DATE, allowNull: false },
      updated_by: { type: DataTypes.INTEGER(10), allowNull: false },
      updated_at: { type: DataTypes.DATE, allowNull: false },
    },
    {
      sequelize,
      modelName: "trx_agent_sales",
      freezeTableName: true,
      timestamps: false,
    }
  );
  return trx_agent_sales;
};
