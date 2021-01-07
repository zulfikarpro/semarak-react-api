"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class mst_goods_barcode extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      mst_goods_barcode.hasOne(models.trx_agent_stock, {
        foreignKey: "goods_id",
        sourceKey: "goods_id",
      });
      mst_goods_barcode.belongsTo(models.mst_goods, {
        foreignKey: "goods_id",
        sourceKey: "id",
      });
    }
  }
  mst_goods_barcode.init(
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
      code: {
        type: DataTypes.INTEGER,
      },
      created_by: { type: DataTypes.STRING(16), allowNull: false },
      updated_by: { type: DataTypes.STRING(16), allowNull: false },
      created_at: { type: DataTypes.DATE, allowNull: false },
      updated_at: { type: DataTypes.DATE, allowNull: false },
    },
    {
      sequelize,
      modelName: "mst_goods_barcode",
      freezeTableName: true,
      timestamps: false,
      hooks: {
        beforeCreate: function (create) {
          create.barcode = create.barcode.toString().toLowerCase();
          return create;
        },
      },
    }
  );
  return mst_goods_barcode;
};
