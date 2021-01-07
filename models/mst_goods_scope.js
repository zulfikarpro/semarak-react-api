"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class mst_goods_scope extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      mst_goods_scope.belongsTo(models.trx_warehouse_stock, {
        foreignKey: "warehouse_stock_id",
        sourceKey: "id",
      });
    }
  }
  mst_goods_scope.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        unique: true,
      },
      goods_id: {
        type: DataTypes.INTEGER,
      },
      warehouse_stock_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      scope_id: {
        type: DataTypes.FLOAT(7, 0),
        allowNull: false,
      },
      margin_persen: {
        type: DataTypes.FLOAT(7, 0),
        allowNull: false,
      },
      margin_nominal: {
        type: DataTypes.FLOAT(7, 0),
        allowNull: false,
      },
      price: {
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
      modelName: "mst_goods_scope",
      freezeTableName: true,
      timestamps: false,
    }
  );
  return mst_goods_scope;
};
