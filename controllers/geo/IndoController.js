const moment = require("moment");
moment.tz.setDefault("Asia/Jakarta");
let today = "";
setInterval(function () {
  today = moment().format();
}, 1000);
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
//models
var models = require("../../models");
var { sequelize } = require("../../models");
var mst_regencies = models.mst_regencies;
var mst_provinces = models.mst_provinces;
var mst_regencies = models.mst_regencies;
var mst_districts = models.mst_districts;
var mst_villages = models.mst_villages;
var trx_error_log = models.trx_error_log;

exports.province = (req, res) => {
  mst_provinces.findAll().then((provinces) => {
    return res
      .status(200)
      .json({
        message: {
          eng: "Provinces loaded!.",
          ind: "Propinsi termuat!.",
        },
        status: 200,
        data: provinces,
      })
      .catch((err) => {
        if (err.name === "Custom") {
          return res
            .status(200)
            .json({ message: err.message, status: 400, data: [] });
        } else {
          trx_error_log
            .create({
              err_code: err.original ? err.original.errno : 500,
              err_name: err.name,
              err_message: err.message,
              method: req.method,
              url: req.path,
              created_at: today(),
              created_by: req.user[0].id,
            })
            .catch((err) => {
              console.log("Failed to create err log");
            });
          console.log(JSON.stringify(err, null, 2));
          return res.status(500).json({
            message: {
              eng: "Oops! Something went wrong.",
              ind: "Oops! Ada kesalahan.",
            },
            status: 500,
            data: [],
          });
        }
      });
  });
};

exports.regency = (req, res) => {
  let { province_id } = req.query;
  mst_regencies
    .findAll({
      where: {
        province_id,
      },
    })
    .then((regency) => {
      res
        .status(200)
        .json({
          message: {
            eng: "Regencies loaded!.",
            ind: "Regensi termuat!.",
          },
          status: 200,
          data: regency,
        })
        .catch((err) => {
          if (err.name === "Custom") {
            res
              .status(200)
              .json({ message: err.message, status: 400, data: [] });
          } else {
            trx_error_log
              .create({
                err_code: err.original ? err.original.errno : 500,
                err_name: err.name,
                err_message: err.message,
                method: req.method,
                url: req.path,
                created_at: today(),
                created_by: req.user[0].id,
              })
              .catch((err) => {
                console.log("Failed to create err log");
              });
            console.log(JSON.stringify(err, null, 2));
            return res.status(500).json({
              message: {
                eng: "Oops! Something went wrong.",
                ind: "Oops! Ada kesalahan.",
              },
              status: 500,
              data: [],
            });
          }
        });
    });
};

exports.districts = (req, res) => {
  let { regency_id } = req.query;
  mst_districts
    .findAll({
      where: {
        regency_id,
      },
    })
    .then((districts) => {
      res
        .status(200)
        .json({
          message: {
            eng: "Districts loaded!.",
            ind: "Distrik termuat!.",
          },
          status: 200,
          data: districts,
        })
        .catch((err) => {
          if (err.name === "Custom") {
            res
              .status(200)
              .json({ message: err.message, status: 400, data: [] });
          } else {
            trx_error_log
              .create({
                err_code: err.original ? err.original.errno : 500,
                err_name: err.name,
                err_message: err.message,
                method: req.method,
                url: req.path,
                created_at: today(),
                created_by: req.user[0].id,
              })
              .catch((err) => {
                console.log("Failed to create err log");
              });
            console.log(JSON.stringify(err, null, 2));
            return res.status(500).json({
              message: {
                eng: "Oops! Something went wrong.",
                ind: "Oops! Ada kesalahan.",
              },
              status: 500,
              data: [],
            });
          }
        });
    });
};

exports.villages = (req, res) => {
  let { district_id } = req.query;
  mst_villages
    .findAll({
      where: {
        district_id,
      },
    })
    .then((villages) => {
      res
        .status(200)
        .json({
          message: {
            eng: "Villages loaded!.",
            ind: "Desa termuat!.",
          },
          status: 200,
          data: villages,
        })
        .catch((err) => {
          if (err.name === "Custom") {
            res
              .status(200)
              .json({ message: err.message, status: 400, data: [] });
          } else {
            trx_error_log
              .create({
                err_code: err.original ? err.original.errno : 500,
                err_name: err.name,
                err_message: err.message,
                method: req.method,
                url: req.path,
                created_at: today(),
                created_by: req.user[0].id,
              })
              .catch((err) => {
                console.log("Failed to create err log");
              });
            console.log(JSON.stringify(err, null, 2));
            return res.status(500).json({
              message: {
                eng: "Oops! Something went wrong.",
                ind: "Oops! Ada kesalahan.",
              },
              status: 500,
              data: [],
            });
          }
        });
    });
};
