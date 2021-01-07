"use strict";
const { Model } = require("sequelize");
var bcrypt = require("bcrypt");
module.exports = (sequelize, DataTypes) => {
  class mst_user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      mst_user.hasOne(models.mst_role, {
        foreignKey: "id",
        sourceKey: "role_id",
      });
      mst_user.hasOne(models.mst_agent, {
        foreignKey: "user_id",
        sourceKey: "id",
      });
      mst_user.hasMany(models.trx_user_points, {
        foreignKey: "user_id",
        sourceKey: "id",
      });
    }
  }
  mst_user.init(
    {
      id: {
        type: DataTypes.INTEGER(10),
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
        unique: true,
      },
      alias: { type: DataTypes.STRING(16), allowNull: false },
      email: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true,
      },
      otp_token: { type: DataTypes.STRING(512), allowNull: true },
      forgot_token: { type: DataTypes.STRING(512), allowNull: true },
      phone: { type: DataTypes.STRING(15), allowNull: false, unique: true },
      password: { type: DataTypes.STRING(20), allowNull: false },
      refresh_token: { type: DataTypes.STRING(512), allowNull: true },
      role_id: { type: DataTypes.STRING(2), allowNull: false },
      phone_verified_at: { type: DataTypes.DATE },
      firebase_token: {type: DataTypes.STRING(100), allowNull: true},
      created_by: { type: DataTypes.STRING(16), allowNull: false },
      updated_by: { type: DataTypes.STRING(16), allowNull: false },
      created_at: { type: DataTypes.DATE, allowNull: false },
      updated_at: { type: DataTypes.DATE, allowNull: false },
    },
    {
      sequelize,
      modelName: "mst_user",
      freezeTableName: true,
      timestamps: false,
      hooks: {
        beforeCreate: function (agent) {
          agent.alias = agent.alias.toString().toLowerCase();
          agent.email = agent.email.toString().toLowerCase();
          agent.password = bcrypt.hashSync(agent.password, 10);
          return agent;
        },
        beforeBulkUpdate: function (agent) {
          if (agent.password) {
            agent.password = bcrypt.hashSync(agent.password, 10);
          }

          return agent;
        },
      },
    }
  );
  mst_user.prototype.validPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
  };

  return mst_user;
};
