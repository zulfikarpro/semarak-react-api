"use strict";
const { Model } = require("sequelize");
const { goods_img } = require("../helpers/image");

module.exports = (sequelize, DataTypes) => {
  class mst_raw_goods extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      mst_raw_goods.hasOne(models.trx_agent_stock, {
        foreignKey: "sug_goods_id",
        sourceKey: "id",
      });
      mst_raw_goods.hasOne(models.mst_uom, {
        foreignKey: "id",
        sourceKey: "uom_id",
      });
      mst_raw_goods.hasOne(models.mst_user, {
        foreignKey: "id",
        sourceKey: "created_by",
        as: "creator",
      });
      mst_raw_goods.hasOne(models.mst_user, {
        foreignKey: "id",
        sourceKey: "updated_by",
        as: "updater",
      });
      mst_raw_goods.hasOne(models.mst_goods_category, {
        foreignKey: "id",
        sourceKey: "category_id",
      });
    }
  }
  mst_raw_goods.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        unique: true,
        autoIncrement: true,
      },
      file_name: {
        type: DataTypes.VIRTUAL,
        get() {
          return goods_img() + null;
        },
      },
      category_id: {
        type: DataTypes.INTEGER(),
      },
      barcode: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING(32),
        unique: true,
      },
      dc_price: {
        type: DataTypes.FLOAT,
        unique: true,
      },
      uom_id: {
        type: DataTypes.INTEGER(10),
        unique: true,
      },
      created_by: { type: DataTypes.STRING(16), allowNull: false },
      updated_by: { type: DataTypes.STRING(16), allowNull: false },
      created_at: { type: DataTypes.DATE, allowNull: false },
      updated_at: { type: DataTypes.DATE, allowNull: false },
    },
    {
      sequelize,
      modelName: "mst_raw_goods",
      freezeTableName: true,
      timestamps: false,
      hooks: {
        beforeCreate: function (create) {
          create.name = create.name.toString().toLowerCase();
          return create;
        },
      },
    }
  );
  return mst_raw_goods;
};
