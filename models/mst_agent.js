/* eslint-disable camelcase */
/* eslint-disable new-cap */
/* eslint-disable valid-jsdoc */
/* eslint-disable require-jsdoc */
'use strict';
const {Model} = require('sequelize');
// const {agent} = require('../helpers/image');

module.exports = (sequelize, DataTypes) => {
  class mst_agent extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      mst_agent.belongsTo(models.mst_user, {
        foreignKey: 'user_id',
        sourceKey: 'id',
      });
      mst_agent.hasMany(models.trx_agent_sales, {
        foreignKey: 'agent_id',
        sourceKey: 'user_id',
      });
      mst_agent.hasOne(models.mst_merchant_type, {
        foreignKey: 'id',
        sourceKey: 'type_id',
      });
      mst_agent.hasOne(models.mst_regencies, {
        foreignKey: 'id',
        sourceKey: 'regency_id',
      });
      mst_agent.hasOne(models.mst_provinces, {
        foreignKey: 'id',
        sourceKey: 'province_id',
      });
      mst_agent.hasOne(models.mst_districts, {
        foreignKey: 'id',
        sourceKey: 'district_id',
      });
      mst_agent.hasOne(models.mst_villages, {
        foreignKey: 'id',
        sourceKey: 'village_id',
      });
      mst_agent.hasOne(models.mst_residential, {
        foreignKey: 'id',
        sourceKey: 'residential_id',
      });
      mst_agent.hasOne(models.mst_marital, {
        foreignKey: 'id',
        sourceKey: 'marital_id',
      });
      mst_agent.hasOne(models.mst_gender, {
        foreignKey: 'id',
        sourceKey: 'gender_id',
      });
      mst_agent.hasOne(models.mst_religions, {
        foreignKey: 'id',
        sourceKey: 'religion_id',
      });
      mst_agent.hasOne(models.mst_identity, {
        foreignKey: 'id',
        sourceKey: 'id_type',
      });
    }
  }
  mst_agent.init(
      {
        user_id: {
          type: DataTypes.INTEGER(5),
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
          unique: true,
        },
        file_name: {
          type: DataTypes.STRING(32),
          allowNull: false,
          get() {
            // return agent() + this.getDataValue('file_name');
            return this.getDataValue('file_name');
          },
        },
        name: {type: DataTypes.STRING(32), allowNull: false},
        // region: { type: DataTypes.STRING(16), allowNull: false },
        id_number: {type: DataTypes.STRING(32), allowNull: false},
        id_type: {type: DataTypes.INTEGER(5), allowNull: false},
        id_photo: {type: DataTypes.STRING(32), allowNull: false},
        front_store: {
          type: DataTypes.STRING(32),
          allowNull: false,
          get() {
            // return agent() + this.getDataValue('front_store');
            return this.getDataValue('front_store');
          },
        },
        left_store: {
          type: DataTypes.STRING(32),
          allowNull: false,
          get() {
            // return agent() + this.getDataValue('left_store');
            return this.getDataValue('left_store');
          },
        },
        right_store: {
          type: DataTypes.STRING(32),
          allowNull: false,
          get() {
            // return agent() + this.getDataValue('right_store');
            return this.getDataValue('right_store');
          },
        },
        // nationality: { type: DataTypes.STRING(16), allowNull: false },
        // village: { type: DataTypes.STRING(16), allowNull: false },
        // sub_district: { type: DataTypes.STRING(16), allowNull: false },
        street: {type: DataTypes.STRING(32), allowNull: false},
        rt: {type: DataTypes.INTEGER(5), allowNull: false},
        rw: {type: DataTypes.INTEGER(5), allowNull: false},
        scope_id: {type: DataTypes.INTEGER(5), allowNull: false},
        type_id: {type: DataTypes.INTEGER(5), allowNull: false},
        long_lat: {type: DataTypes.STRING(32), allowNull: false},
        store_name: {type: DataTypes.STRING(32), allowNull: false},
        owner_address: {type: DataTypes.STRING(132), allowNull: false},
        number: {type: DataTypes.STRING(5), allowNull: false},
        postal_code: {type: DataTypes.STRING(6), allowNull: false},
        age: {type: DataTypes.INTEGER(3), allowNull: false},
        birth_date: {type: DataTypes.DATE, allowNull: false},
        birth_place: {type: DataTypes.STRING(16), allowNull: false},
        regency_id: {type: DataTypes.INTEGER(5), allowNull: false},
        province_id: {type: DataTypes.INTEGER(5), allowNull: false},
        district_id: {type: DataTypes.INTEGER(5), allowNull: false},
        village_id: {type: DataTypes.INTEGER(5), allowNull: false},
        marital_id: {type: DataTypes.INTEGER(5), allowNull: false},
        gender_id: {type: DataTypes.INTEGER(5), allowNull: false},
        residential_id: {type: DataTypes.INTEGER(5), allowNull: false},
        residential_entry: {type: DataTypes.INTEGER(5), allowNull: false},
        religion_id: {type: DataTypes.INTEGER(5), allowNull: false},
        created_by: {type: DataTypes.STRING(16), allowNull: false},
        updated_by: {type: DataTypes.STRING(16), allowNull: false},
        created_at: {type: DataTypes.DATE, allowNull: false},
        updated_at: {type: DataTypes.DATE, allowNull: false},
      },
      {
        sequelize,
        modelName: 'mst_agent',
        freezeTableName: true,
        timestamps: false,
        omitNull: true,
        hooks: {
          beforeCreate: function(agent) {
            agent.file_name = agent.file_name.toString().toLowerCase();
            agent.name = agent.name.toString().toLowerCase();
            // agent.region = agent.region.toString().toLowerCase();
            // agent.nationality = agent.nationality.toString().toLowerCase();
            // agent.village = agent.village.toString().toLowerCase();
            // agent.sub_district = agent.sub_district.toString().toLowerCase();
            agent.street = agent.street.toString().toLowerCase();
            agent.rt = agent.rt.toString().toLowerCase();
            agent.rw = agent.rw.toString().toLowerCase();
            agent.number = agent.number.toString().toLowerCase();
            agent.postal_code = agent.postal_code.toString().toLowerCase();
            agent.birth_place = agent.birth_place.toString().toLowerCase();
            agent.store_name = agent.store_name.toString().toLowerCase();
            return agent;
          },
        },
      },
  );
  return mst_agent;
};
