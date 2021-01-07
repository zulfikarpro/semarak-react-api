"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class trx_otp_request extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // trx_otp_request.hasOne(models.trx_otp_request_detail, {
      //   foreignKey: "po_id",
      //   sourceKey: "id",
      // });
    }
  }
  trx_otp_request.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        unique: true,
      },
      phone: {
        type: DataTypes.STRING(15),
        allowNull: false,
      },
      reset_att: {
        type: DataTypes.INTEGER(2),
      },
      last_reset: {
        type: DataTypes.DATE(),
      },
      register_att: {
        type: DataTypes.INTEGER(2),
      },
      last_register: {
        type: DataTypes.DATE(),
      },
    },
    {
      sequelize,
      modelName: "trx_otp_request",
      freezeTableName: true,
      timestamps: false,
    }
  );
  return trx_otp_request;
};
