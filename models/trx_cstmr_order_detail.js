"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class trx_cstmr_order_detail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      trx_cstmr_order_detail.belongsTo(models.mst_goods, {
        foreignKey: "id",
        sourceKey: "goods_id",
      });
      trx_cstmr_order_detail.belongsTo(models.trx_cstmr_order, {
        foreignKey: "cstmr_order_id",
        sourceKey: "id",
      });
      trx_cstmr_order_detail.hasOne(models.mst_user, {
        foreignKey: "id",
        sourceKey: "created_by",
        as: "creator",
      });
    }
  }
  trx_cstmr_order_detail.init(
    {
      id: {
        type: DataTypes.STRING(5),
        primaryKey: true,
        allowNull: false,
        unique: true,
        autoIncrement: true,
      },
      cstmr_order_id: { type: DataTypes.INTEGER(10), allowNull: false },
      goods_id: { type: DataTypes.INTEGER(10), allowNull: false },
      sug_goods_id: { type: DataTypes.INTEGER(10), allowNull: false },
      qty: {
        type: DataTypes.INTEGER(10),
        allowNull: false,
      },
      price: { type: DataTypes.FLOAT(), allowNull: false },
      sub_total: { type: DataTypes.FLOAT(), allowNull: false },

      created_by: { type: DataTypes.STRING(16), allowNull: false },
      created_at: { type: DataTypes.DATE, allowNull: false },
    },
    {
      sequelize,
      modelName: "trx_cstmr_order_detail",
      freezeTableName: true,
      timestamps: false,
    }
  );
  return trx_cstmr_order_detail;
};
