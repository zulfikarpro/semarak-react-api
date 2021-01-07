"use strict";
const { Model } = require("sequelize");
const { department_img } = require("../helpers/image");

module.exports = (sequelize, DataTypes) => {
  class mst_goods_department extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      mst_goods_department.hasMany(models.mst_goods_division, {
        foreignKey: "department_id",
        sourceKey: "id",
      });
    }
  }
  mst_goods_department.init(
    {
      id: {
        type: DataTypes.STRING(2),
        primaryKey: true,
        allowNull: false,
        unique: true,
      },
      name: { type: DataTypes.STRING(32), allowNull: false, unique: true },
      file_name: {
        type: DataTypes.STRING(32),
        allowNull: false,
        unique: true,
        get() {
          return department_img() + this.getDataValue("file_name");
        },
      },
      created_by: { type: DataTypes.STRING(16), allowNull: false },
      updated_by: { type: DataTypes.STRING(16), allowNull: false },
      created_at: { type: DataTypes.DATE, allowNull: false },
      updated_at: { type: DataTypes.DATE, allowNull: false },
    },
    {
      sequelize,
      modelName: "mst_goods_department",
      freezeTableName: true,
      timestamps: false,
      hooks: {
        beforeCreate: function (create) {
          create.name = create.name.toString().toLowerCase();
          create.file_name = create.file_name.toString().toLowerCase();
          return create;
        },
      },
    }
  );
  return mst_goods_department;
};
