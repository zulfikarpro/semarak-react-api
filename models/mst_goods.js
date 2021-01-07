"use strict";
const { Model } = require("sequelize");
const { goods_img } = require("../helpers/image");

module.exports = (sequelize, DataTypes) => {
  class mst_goods extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      mst_goods.belongsTo(models.mst_goods_category, {
        foreignKey: "category_id",
        sourceKey: "id",
      });
      mst_goods.hasOne(models.trx_agent_stock, {
        foreignKey: "goods_id",
        sourceKey: "id",
      });
      mst_goods.hasOne(models.trx_warehouse_stock, {
        foreignKey: "goods_id",
        sourceKey: "id",
      });
      // mst_goods.hasOne(models.temp_agent_sales, {
      //   foreignKey: "id_goods",
      //   sourceKey: "id",
      // });
      mst_goods.hasMany(models.mst_goods_barcode, {
        foreignKey: "goods_id",
        sourceKey: "id",
        // as: "goods_barcodes",
      });
      mst_goods.hasMany(models.mst_goods_scope, {
        foreignKey: "goods_id",
        sourceKey: "id",
      });
      mst_goods.hasOne(models.mst_uom, {
        foreignKey: "id",
        sourceKey: "uom_id",
      });
    }
  }
  mst_goods.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        unique: true,
      },
      category_id: {
        type: DataTypes.INTEGER,
      },
      supplier_id: {
        type: DataTypes.INTEGER,
      },
      name: {
        type: DataTypes.STRING(32),
        unique: true,
      },
      uom_id: {
        type: DataTypes.INTEGER(5),
      },
      file_name: {
        type: DataTypes.STRING(32),
        unique: true,
        get() {
          return goods_img() + this.getDataValue("file_name");
        },
      },
      created_by: { type: DataTypes.STRING(16), allowNull: false },
      updated_by: { type: DataTypes.STRING(16), allowNull: false },
      created_at: { type: DataTypes.DATE, allowNull: false },
      updated_at: { type: DataTypes.DATE, allowNull: false },
    },
    {
      sequelize,
      modelName: "mst_goods",
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
  return mst_goods;
};
