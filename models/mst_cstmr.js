"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class mst_cstmr extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      mst_cstmr.belongsTo(models.mst_user, {
        foreignKey: "user_id",
        sourceKey: "id",
      });
    }
  }
  mst_cstmr.init(
    {
      id: {
        type: DataTypes.INTEGER(5),
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
        unique: true,
      },
      user_id:{type: DataTypes.INTEGER(5)},
      file_name: { type: DataTypes.STRING(32) },
      name: { type: DataTypes.STRING(32), allowNull: false },
      region: { type: DataTypes.STRING(16) },
      age: { type: DataTypes.INTEGER(3) },
      birth_date: { type: DataTypes.DATE },
      birth_place: { type: DataTypes.STRING(16) },
      created_by: { type: DataTypes.STRING(16), allowNull: false },
      updated_by: { type: DataTypes.STRING(16), allowNull: false },
      created_at: { type: DataTypes.DATE, allowNull: false },
      updated_at: { type: DataTypes.DATE, allowNull: false },
    },
    {
      sequelize,
      modelName: "mst_cstmr",
      freezeTableName: true,
      timestamps: false,
      hooks: {
        beforeCreate: function (agent) {
          agent.name = agent.name.toString().toLowerCase();
          return agent;
        },
      },
    }
  );
  return mst_cstmr;
};
