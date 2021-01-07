/* eslint-disable require-jsdoc */
/* eslint-disable camelcase */
const jwt = require('jsonwebtoken');
const passport = require('passport');
const models = require('../models');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const mst_user = models.mst_user;
// const mst_role = models.mst_role;
function agentDetail(req, res, next) {
  const auth = req.header('x-auth-token');
  if (!auth) {
    return res.status(401).json({
      message: {
        eng: 'Oops! You\'re Not Authenticated',
        ind: 'Oops! Anda tidak memiliki akses.',
      },
      status: 401,
      data: {},
    });
  }
  jwt.verify(auth, process.env.JWT_AGENT_AUTH, function(_err, decode_one) {
    if (decode_one) {
      mst_user
          .findAll({
            attributes: ['id', 'phone', 'email', 'role_id', 'otp_token'],
            include: [
              {
                model: models.mst_role,
                attributes: ['name', 'table'],
              },
            ],
            where: {
              [Op.or]: [{email: decode_one.auth}, {phone: decode_one.auth}],
            },
          })
          .then((user) => {
            if (user.length > 0) {
              req.user = user;
              next();
            } else {
              return {
                name: 'Custom',
                message: {
                  eng: 'Oops! User not found, Register insted.',
                  ind: 'Oops! Akun tidak ada, Mohon daftar.',
                },
              };
            }
          })
          .catch((err) => {
            if (err.name === 'Custom') {
              res
                  .status(200)
                  .json({message: err.message, status: 400, data: {}});
            } else {
              console.log('server err:', err);
              res.status(500).json({
                message: {
                  eng: 'Oops! Something went wrong.',
                  ind: 'Oops! Ada kesalahan.',
                },
                status: 500,
                data: {},
              });
            }
          });
    } else {
      return res.status(401).json({
        message: {
          eng: 'Oops! You\'re Not Authenticated',
          ind: 'Oops! Anda tidak memiliki akses.',
        },
        status: 401,
        data: {},
      });
    }
  });
}

module.exports = agentDetail;
