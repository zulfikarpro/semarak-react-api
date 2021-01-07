"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class mst_goods_price extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      mst_goods_price.belongsTo(models.trx_warehouse_stock, {
        foreignKey: "goods_id",
        sourceKey: "goods_id",
      });
      mst_goods_price.belongsTo(models.mst_goods, {
        foreignKey: "goods_id",
        sourceKey: "id",
      });
    }
  }
  mst_goods_price.init(
    {
      goods_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        unique: true,
      },
      po_price: {
        type: DataTypes.FLOAT(7, 0),
        allowNull: false,
      },
      dc_margin: {
        type: DataTypes.FLOAT(7, 0),
        allowNull: false,
      },
      dc_price: {
        type: DataTypes.FLOAT(7, 0),
        allowNull: false,
      },
      created_by: { type: DataTypes.STRING(16), allowNull: false },
      updated_by: { type: DataTypes.STRING(16), allowNull: false },
      created_at: { type: DataTypes.DATE, allowNull: false },
      updated_at: { type: DataTypes.DATE, allowNull: false },
    },
    {
      sequelize,
      modelName: "mst_goods_price",
      freezeTableName: true,
      timestamps: false,
    }
  );
  return mst_goods_price;
};
