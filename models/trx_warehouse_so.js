"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class trx_warehouse_so extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      trx_warehouse_so.hasMany(models.trx_warehouse_so_detail, {
        foreignKey: "so_id",
        sourceKey: "id",
        as: "warehouse_so",
      });
      trx_warehouse_so.hasOne(models.trx_agent_delivery_status, {
        foreignKey: "po_id",
        sourceKey: "id",
      });
      trx_warehouse_so.belongsTo(models.mst_warehouse, {
        foreignKey: "warehouse_id",
        sourceKey: "id",
      });
      trx_warehouse_so.hasOne(models.mst_user, {
        foreignKey: "id",
        sourceKey: "updated_by",
        as: "updater",
      });
      trx_warehouse_so.hasOne(models.mst_user, {
        foreignKey: "id",
        sourceKey: "created_by",
        as: "creator",
      });
    }
  }
  trx_warehouse_so.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        unique: true,
      },
      po_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
      },
      warehouse_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      nomor_faktur: {
        type: DataTypes.STRING(32),
        allowNull: false,
      },
      total_qty: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      total_price: {
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
      modelName: "trx_warehouse_so",
      freezeTableName: true,
      timestamps: false,
    }
  );
  return trx_warehouse_so;
};
