"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class trx_cstmr_order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      trx_cstmr_order.hasMany(models.trx_cstmr_order_detail, {
        foreignKey: "cstmr_order_id",
        sourceKey: "id",
        as: "order_detail",
      });
      trx_cstmr_order.belongsTo(models.mst_cstmr, {
        foreignKey: "cstmr_id",
        sourceKey: "id",
      });
      trx_cstmr_order.hasOne(models.mst_user, {
        foreignKey: "id",
        sourceKey: "updated_by",
        as: "updater",
      });
      trx_cstmr_order.hasOne(models.mst_user, {
        foreignKey: "id",
        sourceKey: "created_by",
        as: "creator",
      });
    }
  }
  trx_cstmr_order.init(
    {
      id: {
        type: DataTypes.STRING(5),
        primaryKey: true,
        allowNull: false,
        unique: true,
        autoIncrement: true,
      },
      cstmr_id: { type: DataTypes.INTEGER(10), allowNull: false },
      agent_id: { type: DataTypes.INTEGER(10), allowNull: false },
      total_price: {
        type: DataTypes.FLOAT(),
        allowNull: false,
      },
      delivery_price: {
        type: DataTypes.FLOAT(),
        allowNull: false,
      },
      total_qty: {
        type: DataTypes.INTEGER(15),
        allowNull: false,
      },
      status_id: {
        type: DataTypes.INTEGER(5),
        allowNull: false,
      },
      estimated_arrival: {
        type: DataTypes.DATE(),
      },
      receiver_name: {
        type: DataTypes.STRING(32),
        allowNull: false,
      },
      receiver_phone: {
        type: DataTypes.STRING(32),
        allowNull: false,
      },
      receiver_address: {
        type: DataTypes.STRING(62),
        allowNull: false,
      },
      long_lat: { type: DataTypes.STRING(32), allowNull: false },
      note: { type: DataTypes.TEXT("tiny"), allowNull: false },
      cancel_reason: { type: DataTypes.TEXT("tiny"), allowNull: false },
      created_by: { type: DataTypes.STRING(16), allowNull: false },
      updated_by: { type: DataTypes.STRING(16), allowNull: false },
      created_at: { type: DataTypes.DATE, allowNull: false },
      updated_at: { type: DataTypes.DATE, allowNull: false },
    },
    {
      sequelize,
      modelName: "trx_cstmr_order",
      freezeTableName: true,
      timestamps: false,
    }
  );
  return trx_cstmr_order;
};
