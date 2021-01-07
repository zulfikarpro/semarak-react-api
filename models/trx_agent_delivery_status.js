"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class trx_agent_delivery_status extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      trx_agent_delivery_status.hasOne(models.mst_delivery_status, {
        foreignKey: "id",
        sourceKey: "delivery_status_id",
      });
      trx_agent_delivery_status.belongsTo(models.trx_agent_po, {
        foreignKey: "po_id",
        sourceKey: "id",
      });
      trx_agent_delivery_status.hasOne(models.mst_user, {
        foreignKey: "id",
        sourceKey: "created_by",
        as: "creator",
      });
      trx_agent_delivery_status.hasOne(models.mst_user, {
        foreignKey: "id",
        sourceKey: "updated_by",
        as: "updater",
      });
    }
  }
  trx_agent_delivery_status.init(
    {
      id: {
        type: DataTypes.INTEGER(5),
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        unique: true,
      },
      po_id: { type: DataTypes.INTEGER, allowNull: false },
      delivery_status_id: { type: DataTypes.INTEGER, allowNull: false },
      estimated_arrival: { type: DataTypes.DATE },
      updated_by: { type: DataTypes.STRING(16), allowNull: false },
      updated_at: { type: DataTypes.DATE, allowNull: false },
      created_by: { type: DataTypes.STRING(16), allowNull: false },
      created_at: { type: DataTypes.DATE, allowNull: false },
    },
    {
      sequelize,
      modelName: "trx_agent_delivery_status",
      freezeTableName: true,
      timestamps: false,
    }
  );
  return trx_agent_delivery_status;
};
