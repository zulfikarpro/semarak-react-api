/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */

const moment = require('moment');
moment.tz.setDefault('Asia/Jakarta');

const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const jwt = require('jsonwebtoken');

// const bcrypt = require('bcrypt');
// const {sequelize} = require('../models');
// const axios = require('axios');
const {today, last_month} = require('../helpers/timer');
const {
  profile,
  frnt_store,
  lft_store,
  rght_store,
  id,
  agent,
} = require('../helpers/image');
// models

const models = require('../models');
const mst_agent = models.mst_agent;
const mst_user = models.mst_user;
const mst_religions = models.mst_religions;
const mst_identity = models.mst_identity;
const mst_residentials = models.mst_residentials;
// const trx_agent_sales = models.trx_agent_sales;
const trx_error_log = models.trx_error_log;

// const base64ToPNG = require('../helpers/base64png');
// const rand4digit = require('../helpers/rand4digit');
// const profile_img_store = '../public/user/photo/';

const multer = require('multer');

const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb)=>{
      // console.log(req);
      cb(null, '/');
    },
    filename: (req, file, cb)=>{
      console.log('file', file);
      cb(null, file.originalname);
    },
  }),
});

exports.tesUpload = function(req, res, next) {
  upload.single('myImage')(req, res, next);
  if (err) {
    res.status(200).json(err);
  }
};

exports.register = (req, res) =>{
  console.log('aidi' + req.user[0].role_id);
  if (!req.user[0].role_id === 'sl') {
    return res.status(400).json({
      message: 'you are not allowed!',
    });
  }
  req.body.salesid=req.user[0].id;
  firstReg(req, function(resultFirst) {
    if (resultFirst.hasOwnProperty('message')) {
      return res.status(400).json({resultFirst});
    } else {
      req.body.userId=resultFirst.userId;
      console.log(resultFirst);
      return secondReg(req, function(resultSecond) {
        res.status(200).json(resultSecond);
      });
    }
  });
};

const firstReg = (req, callback) => {
  const idMarketing = req.body.salesid;
  console.log('idMarketing', idMarketing);
  // const maps = new Map();
  mst_user.findOne({
    where: {
      email: req.email,
    }, $or: [{
      phone: req.phone,
    }],
  }).then((user)=>{
    console.log('user : ', (user));
    if (user) {
      return callback({
        message: 'user sudah terdaftar',
        status: 500,
        data: [],
      });
    } else {
      mst_user.create({
        alias: req.alias,
        email: req.email,
        phone: req.phone,
        password: req.password,
        role_id: req.role_id,
        // otp_token,
        refresh_token: null,
        phone_verified_at: today(),
        created_at: today(),
        created_by: idMarketing,
        updated_at: today(),
        updated_by: idMarketing,
      }).then((hasil)=>{
        console.log('hasil', hasil.id);
        return callback({userId: hasil.id});
      });
    }
  });
};

const secondReg = (req, callback) =>{
  console.log('secondReg', req.userId);
  const {
    id_photo,
    left_store,
    right_store,
    front_store} = req.file;
  const {
    id_number,
    id_type,
    file_name,
    full_name,
    long_lat,
    store_name,
    birth_place,
    nationality, // wna wni
    street,
    rt,
    rw,
    number,
    age,
    birth_date,
    postal_code,
    owner_address,
    regency_id,
    province_id,
    district_id,
    village_id,
    marital_id,
    gender_id,
    residential_id,
    residential_entry,
    religion_id,
    citizenship_id,
  } = req.body;
  mst_agent.create({
    id_photo,
    front_store,
    left_store,
    right_store,
    file_name,
    user_id: req.userId,
    // file_name: file_name ? profile(req.user[0].id) : undefined,
    name: full_name,
    gender_id,
    age,
    birth_place,
    id_number,
    id_type,
    marital_id,
    birth_date,
    nationality,
    regency_id,
    district_id,
    province_id,
    village_id,
    street,
    rt,
    rw,
    residential_id,
    residential_entry,
    religion_id,
    // id_photo: id_photo ? id(req.user[0].id) : undefined,
    // front_store: front_store ? frnt_store(req.user[0].id) : undefined,
    // left_store: left_store ? lft_store(req.user[0].id) : undefined,
    // right_store: right_store ? rght_store(req.user[0].id) : undefined,
    owner_address,
    number,
    citizenship_id,
    postal_code,
    store_name,
    long_lat,
    scope_id: 3,
    type_id: 2,
    created_at: today(),
    created_by: idMarketing,
    updated_at: today(),
    updated_by: idMarketing,
  }).catch((e)=>{
    console.log(e.message);
    callback({message: e.message,
      status: 500});
  }).then((hasil)=>{
    console.log(hasil);
    callback({message: 'berhasil',
      status: 200,
      data: {hasil}});
  });
};

exports.checkingcredentialregister = (req, res) => {
  if (req.method==='GET') {
    return res.status(400).json({
      message: 'method not found',
    });
  }
  if (!req.user[0].role_id === 'sl') {
    return res.status(400).json({
      message: 'you are not allowed!',
    });
  } else {
    return res.status(200).json({
      message: 'berhasil',
      status: 200,
    });
  }
};

exports.login = (req, res) => {
  const {phone, email, password} = req.body;
  let auth_token = null;
  let refresh_token = null;
  mst_user
      .findOne({
        where: {
          [Op.or]: [
            {
              email: email ? email : '',
            },
            {phone: phone ? phone : ''},
          ],
        },
      })
      .then((user) => {
        if (!user) {
          return {
            name: 'Custom',
            message: {
              eng: 'Oops! Account not exist, register instead.',
              ind: 'Oops! Akun tidak ada, mohon daftar.',
            },
          };
        } else if (user.phone_verified_at === null) {
          return {
            name: 'Custom',
            message: {
              eng: 'Oops! Your phone number is\'nt verified yet.',
              ind: 'Oops! Nomer HP anda belum terverifikasi.',
            },
          };
        }
        return user;
      })
      .then((user) => {
        if (user.validPassword(password)) {
          auth_token = jwt.sign(
              {
                auth: user.email,
              },
              process.env.JWT_AGENT_AUTH,
              {expiresIn: process.env.JWT_ACCESS_TIME},
          );
          refresh_token = jwt.sign(
              {
                auth: user.email,
              },
              process.env.JWT_AGENT_REFRESH,
              {expiresIn: process.env.JWT_REFRESH_TIME},
          );
          return mst_user.update(
              {refresh_token: refresh_token},
              {
                where: {
                  email: user.email,
                },
              },
          );
        } else {
          return {
            name: 'Custom',
            message: {
              eng: 'Oops! Wrong password.',
              ind: 'Oops! Password salah.',
            },
          };
        }
      })
      .then(() => {
        return res.status(200).json({
          status: 200,
          message: {
            eng: 'Yayy! Login success!',
            ind: 'Yayy! Login berhasil!',
          },
          data: {
            refresh_token: refresh_token,
            auth_token: auth_token,
          },
        });
      })
      .catch((err) => {
        console.log(err);
        if (err.name === 'Custom') {
          return res
              .status(200)
              .json({message: err.message, status: 400, data: {}});
        } else {
          trx_error_log
              .create({
                err_code: err.original ? err.original.errno : 500,
                err_name: err.name,
                err_message: err.message,
                method: req.method,
                url: req.protocol + '://' + req.get('host') + req.originalUrl,

                created_at: today(),
                created_by: 0,
              })
              .catch((err) => {
                console.log('Failed to create err log');
              });
          console.log(JSON.stringify(err, null, 2));
          return res.status(500).json({
            message: {
              eng: 'Oops! Something went wrong.',
              ind: 'Oops! Ada kesalahan.',
            },
            status: 500,
            data: {},
          });
        }
      });
};

exports.residential = (req, res) => {
  mst_residentials
      .findAll()
      .then((data) => {
        if (data.length === 0) {
          return {
            name: 'Custom',
            message: {
              eng: 'Oops! Data empty.',
              ind: 'Oops! Data kosong.',
            },
          };
        }
        return res.status(200).json({
          message: {
            eng: 'Residential loaded.',
            ind: 'Tempat tinggal termuat',
          },
          status: 200,
          data: data,
        });
      })
      .catch((err) => {
        if (err.name === 'Custom') {
          return res
              .status(200)
              .json({message: err.message, status: 400, data: []});
        } else {
          trx_error_log
              .create({
                err_code: err.original ? err.original.errno : 500,
                err_name: err.name,
                err_message: err.message,
                method: req.method,
                url: req.protocol + '://' + req.get('host') + req.originalUrl,

                created_at: today(),
                created_by: 0,
              })
              .catch((err) => {
                console.log('Failed to create err log');
              });
          console.log(JSON.stringify(err, null, 2));

          return res.status(500).json({
            message: {
              eng: 'Oops! Something went wrong.',
              ind: 'Oops! Ada kesalahan.',
            },
            status: 500,
            data: [],
          });
        }
      });
};
exports.religion = (req, res) => {
  mst_religions
      .findAll()
      .then((data) => {
        if (data.length === 0) {
          return {
            name: 'Custom',
            message: {
              eng: 'Oops! Data empty.',
              ind: 'Oops! Data kosong.',
            },
          };
        }
        return res.status(200).json({
          message: {
            eng: 'Religion loaded.',
            ind: 'Agama termuat',
          },
          status: 200,
          data: data,
        });
      })
      .catch((err) => {
        if (err.name === 'Custom') {
          return res
              .status(200)
              .json({message: err.message, status: 400, data: []});
        } else {
          trx_error_log
              .create({
                err_code: err.original ? err.original.errno : 500,
                err_name: err.name,
                err_message: err.message,
                method: req.method,
                url: req.protocol + '://' + req.get('host') + req.originalUrl,
                created_at: today(),
                created_by: 0,
              })
              .catch((err) => {
                console.log('Failed to create err log');
              });
          console.log(JSON.stringify(err, null, 2));
          return res.status(500).json({
            message: {
              eng: 'Oops! Something went wrong.',
              ind: 'Oops! Ada kesalahan.',
            },
            status: 500,
            data: [],
          });
        }
      });
};

exports.identity = (req, res) => {
  mst_identity
      .findAll()
      .then((data) => {
        if (data.length === 0) {
          return {
            name: 'Custom',
            message: {
              eng: 'Oops! Data empty.',
              ind: 'Oops! Data kosong.',
            },
          };
        }
        return res.status(200).json({
          message: {
            eng: 'Identity type loaded.',
            ind: 'Tipe identitas termuat',
          },
          status: 200,
          data: data,
        });
      })
      .catch((err) => {
        if (err.name === 'Custom') {
          return res
              .status(200)
              .json({message: err.message, status: 400, data: []});
        } else {
          trx_error_log
              .create({
                err_code: err.original ? err.original.errno : 500,
                err_name: err.name,
                err_message: err.message,
                method: req.method,
                url: req.protocol + '://' + req.get('host') + req.originalUrl,

                created_at: today(),
                created_by: 0,
              })
              .catch((err) => {
                console.log('Failed to create err log');
              });
          console.log(JSON.stringify(err, null, 2));
          return res.status(500).json({
            message: {
              eng: 'Oops! Something went wrong.',
              ind: 'Oops! Ada kesalahan.',
            },
            status: 500,
            data: [],
          });
        }
      });
};


// "id_type":1,
// "id_photo":"",
// "front_store":"depan",
// "left_store":"belakang",
// "right_store":"kanan",
// "regency_id":3171,
// "province_id":31,
// "district_id":317103,
// "village_id":3171031001,
// "marital_id":1,
// "residential_id":2,
// "residential_entry":"2020-01-19"
