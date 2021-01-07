"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class mst_role extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  mst_role.init(
    {
      id: {
        type: DataTypes.STRING(5),
        primaryKey: true,
        allowNull: false,
        unique: true,
      },
      name: { type: DataTypes.STRING(255), allowNull: false },
      table: {
        type: DataTypes.STRING(15),
        allowNull: false,
        unique: true,
      },
      description: { type: DataTypes.STRING(100), allowNull: false },
      created_by: { type: DataTypes.STRING(16), allowNull: false },
      updated_by: { type: DataTypes.STRING(16), allowNull: false },
      created_at: { type: DataTypes.DATE, allowNull: false },
      updated_at: { type: DataTypes.DATE, allowNull: false },
    },
    {
      sequelize,
      modelName: "mst_role",
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
  return mst_role;
};
