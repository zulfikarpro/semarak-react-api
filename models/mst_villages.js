"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class mst_villages extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {}
  }
  mst_villages.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        unique: true,
      },
      district_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        unique: true,
      },
      region_code: {
        type: DataTypes.STRING,
        unique: true,
      },
    },
    {
      sequelize,
      modelName: "mst_villages",
      freezeTableName: true,
      timestamps: false,
    }
  );
  return mst_villages;
};
