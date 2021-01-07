"use strict";
const { Model } = require("sequelize");
const { category_img } = require("../helpers/image");

module.exports = (sequelize, DataTypes) => {
  class mst_goods_category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      mst_goods_category.belongsTo(models.mst_goods_division, {
        foreignKey: "division_id",
        sourceKey: "id",
      });
      mst_goods_category.hasMany(models.mst_goods, {
        foreignKey: "category_id",
        sourceKey: "id",
      });
      mst_goods_category.hasMany(models.mst_raw_goods, {
        foreignKey: "category_id",
        sourceKey: "id",
      });
    }
  }
  mst_goods_category.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        unique: true,
      },
      name: {
        type: DataTypes.STRING(32),
      },
      file_name: {
        type: DataTypes.STRING(20),
        get() {
          return category_img() + this.getDataValue("file_name");
        },
      },
      division_id: {
        type: DataTypes.INTEGER,
      },
      created_by: { type: DataTypes.STRING(16), allowNull: false },
      updated_by: { type: DataTypes.STRING(16), allowNull: false },
      created_at: { type: DataTypes.DATE, allowNull: false },
      updated_at: { type: DataTypes.DATE, allowNull: false },
    },
    {
      sequelize,
      modelName: "mst_goods_category",
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
  return mst_goods_category;
};
