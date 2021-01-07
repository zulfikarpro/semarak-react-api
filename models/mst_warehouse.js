"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class mst_warehouse extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      mst_warehouse.hasMany(models.trx_warehouse_so, {
        foreignKey: "warehouse_id",
        sourceKey: "id",
        as: "warehouse",
      });
      mst_warehouse.hasOne(models.mst_user, {
        foreignKey: "id",
        sourceKey: "created_by",
        as: "creator",
      });
    }
  }
  mst_warehouse.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        unique: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      longitude: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      latitude: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      phone: {
        type: DataTypes.STRING(32),
        allowNull: false,
      },
      region: {
        type: DataTypes.STRING(32),
        allowNull: false,
      },
      sub_district: {
        type: DataTypes.STRING(32),
        allowNull: false,
      },
      created_by: { type: DataTypes.INTEGER(10), allowNull: false },
      created_at: { type: DataTypes.DATE, allowNull: false },
      //   updated_by: { type: DataTypes.INTEGER(10), allowNull: false },
      //   updated_at: { type: DataTypes.DATE, allowNull: false },
    },
    {
      sequelize,
      modelName: "mst_warehouse",
      freezeTableName: true,
      timestamps: false,
    }
  );
  return mst_warehouse;
};
