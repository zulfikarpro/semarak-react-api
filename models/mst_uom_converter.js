"use strict";
const { Model } = require("sequelize");
var models = require("../models");

module.exports = (sequelize, DataTypes) => {
  class mst_uom_converter extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  mst_uom_converter.init(
    {
      id: {
        type: DataTypes.STRING(5),
        primaryKey: true,
        allowNull: false,
        unique: true,
      },
      goods_id: {
        type: DataTypes.INTEGER(10),
        allowNull: false,
        // references: {
        //   model: models.trx_agent_stock, // 'Movies' would also work
        //   key: "goods_id",
        // },
      },
      uom_id: {
        type: DataTypes.INTEGER(10),
        allowNull: false,
        // references: {
        //   model: models.trx_agent_stock, // 'Movies' would also work
        //   key: "uom_id",
        // },
      },
      qty: { type: DataTypes.INTEGER(10), allowNull: false },
      created_by: { type: DataTypes.STRING(16), allowNull: false },
      updated_by: { type: DataTypes.STRING(16), allowNull: false },
      created_at: { type: DataTypes.DATE, allowNull: false },
      updated_at: { type: DataTypes.DATE, allowNull: false },
    },
    {
      sequelize,
      modelName: "mst_uom_converter",
      freezeTableName: true,
      timestamps: false,
    }
  );
  return mst_uom_converter;
};
