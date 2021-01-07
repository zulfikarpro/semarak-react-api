"use strict";
const { Model } = require("sequelize");
const { division_img } = require("../helpers/image");

module.exports = (sequelize, DataTypes) => {
  class mst_goods_division extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      mst_goods_division.hasMany(models.mst_goods_category, {
        foreignKey: "division_id",
        sourceKey: "id",
      });
      mst_goods_division.belongsTo(models.mst_goods_department, {
        foreignKey: "id",
        sourceKey: "department_id",
      });
      mst_goods_division.hasOne(models.mst_user, {
        foreignKey: "id",
        sourceKey: "updated_by",
        as: "updater",
      });
      mst_goods_division.hasOne(models.mst_user, {
        foreignKey: "id",
        sourceKey: "created_by",
        as: "creator",
      });
    }
  }
  mst_goods_division.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        unique: true,
      },
      department_id: {
        type: DataTypes.STRING(2),
      },
      alias: {
        type: DataTypes.STRING(32),
        unique: true,
      },
      name: {
        type: DataTypes.STRING(32),
        unique: true,
      },
      file_name: {
        type: DataTypes.STRING(32),
        unique: true,
        get() {
          return division_img() + this.getDataValue("file_name");
        },
      },
      created_by: { type: DataTypes.STRING(16), allowNull: false },
      updated_by: { type: DataTypes.STRING(16), allowNull: false },
      created_at: { type: DataTypes.DATE, allowNull: false },
      updated_at: { type: DataTypes.DATE, allowNull: false },
    },
    {
      sequelize,
      modelName: "mst_goods_division",
      freezeTableName: true,
      timestamps: false,
      hooks: {
        beforeCreate: function (create) {
          create.name = create.name.toString().toLowerCase();
          create.alias = create.alias.toString().toLowerCase();
          create.file_name = create.file_name.toString().toLowerCase();
          return create;
        },
      },
    }
  );
  return mst_goods_division;
};
