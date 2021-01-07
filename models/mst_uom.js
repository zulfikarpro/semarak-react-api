"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class mst_uom extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      mst_uom.belongsTo(models.mst_raw_goods, {
        foreignKey: "id",
        sourceKey: "uom_id",
      });
      mst_uom.belongsTo(models.mst_goods, {
        foreignKey: "id",
        sourceKey: "uom_id",
      });
      mst_uom.belongsToMany(models.trx_agent_stock, {
        through: models.mst_uom_converter,
        foreignKey: "uom_id",
        sourceKey: "id",
        as: "uom_converter",
      });
    }
  }
  mst_uom.init(
    {
      id: {
        type: DataTypes.STRING(5),
        primaryKey: true,
        allowNull: false,
        unique: true,
      },
      name: { type: DataTypes.STRING(255), allowNull: false },
      created_by: { type: DataTypes.STRING(16), allowNull: false },
      updated_by: { type: DataTypes.STRING(16), allowNull: false },
      created_at: { type: DataTypes.DATE, allowNull: false },
      updated_at: { type: DataTypes.DATE, allowNull: false },
    },
    {
      sequelize,
      modelName: "mst_uom",
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
  return mst_uom;
};
