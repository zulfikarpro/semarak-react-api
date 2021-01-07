"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class trx_agent_po extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // trx_agent_po.hasOne(models.trx_agent_po_detail, {
      //   foreignKey: "po_id",
      //   sourceKey: "id",
      // });
      trx_agent_po.hasMany(models.trx_agent_po_detail, {
        foreignKey: "po_id",
        sourceKey: "id",
        as: "agent_po",
      });
      trx_agent_po.hasOne(models.trx_agent_delivery_status, {
        foreignKey: "po_id",
        sourceKey: "id",
      });
      trx_agent_po.hasOne(models.mst_user, {
        foreignKey: "id",
        sourceKey: "updated_by",
        as: "updater",
      });
      trx_agent_po.hasOne(models.mst_user, {
        foreignKey: "id",
        sourceKey: "created_by",
        as: "creator",
      });
    }
  }
  trx_agent_po.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        unique: true,
      },
      agent_id: {
        type: DataTypes.INTEGER(10),
        allowNull: false,
      },
      nomor_nota: {
        type: DataTypes.STRING(10),
        allowNull: false,
      },
      total_price: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      total_qty: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      created_by: { type: DataTypes.INTEGER(10), allowNull: false },
      created_at: { type: DataTypes.DATE, allowNull: false },
      updated_by: { type: DataTypes.INTEGER(10), allowNull: false },
      updated_at: { type: DataTypes.DATE, allowNull: false },
    },
    {
      sequelize,
      modelName: "trx_agent_po",
      freezeTableName: true,
      timestamps: false,
    }
  );
  return trx_agent_po;
};
