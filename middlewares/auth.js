/* eslint-disable no-throw-literal */
/* eslint-disable require-jsdoc */
/* eslint-disable camelcase */
const jwt = require('jsonwebtoken');
// const passport = require('passport');
const models = require('../models');
const Sequelize = require('sequelize');
// const {id} = require('../helpers/image');
const Op = Sequelize.Op;
const mst_agent = models.mst_agent;
const mst_user = models.mst_user;
// const mst_role = models.mst_role;

function auth(req, res, next) {
  const auth = req.header('x-auth-token');
  if (!auth) {
    return res.status(401).json({
      message: {
        eng: 'Oops! You\'re Not Authenticated',
        ind: 'Oops! Anda tidak memiliki akses.',
      },
      status: 401,
    });
  } else {
    jwt.verify(auth, process.env.JWT_AGENT_AUTH, function(_err, decode_one) {
      if (decode_one) {
        mst_user
            .findAll({
              attributes: [
                'id',
                'phone',
                'email',
                'role_id',
                'otp_token',
                'phone_verified_at',
              ],
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
              if (user.length === 0) {
                throw {
                  name: 'Custom',
                  message: {
                    eng: 'Oops! User not found, Register insted.',
                    ind: 'Oops! Akun tidak ada, Mohon daftar.',
                  },
                };
              }
              return user;
            })
            .then((user) => {
              if (user.phone_verified_at === null) {
                throw {
                  name: 'Custom',
                  message: {
                    eng: 'Oops! Your phone is not verified yet.',
                    ind: 'Oops! No HP anda belum terverifikasi.',
                  },
                };
              }
              return user;
            })
            .then((user) => {
              return mst_agent
                  .findOne({
                    where: {
                      user_id: user[0].id,
                    },
                  })
                  .then((agent) => {
                    console.log('agent ' + agent);
                    if (!agent) {
                      authSales(user[0].id, function(result) {
                        console.log('callback' + result);
                        if (!result) {
                          throw {
                            name: 'Custom',
                            message: {
                              eng: 'Oops! Please fullfill your profile.',
                              ind: 'Oops! Mohon penuhi profile anda.',
                            },
                          };
                        } else {
                          req.user = user;
                          next();
                        }
                      });
                    } else {
                      req.user = user;
                      next();
                    }
                  });
            })
            .catch((err) => {
              if (err.name === 'Custom') {
                res.status(200).json({message: err.message, status: 400});
              } else {
                console.log('server err:', err);
                res.status(500).json({
                  message: {
                    eng: 'Oops! Something went wrong.',
                    ind: 'Oops! Ada kesalahan.',
                  },
                  status: 500,
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
        });
      }
    });
  }
}

const authSales = (userId, callback) => {
  // const promise = [];
  // const maps = new Map();
  mst_user.findOne({
    where: {
      id: userId,
    },
  })
      .catch((_err)=>{

      })
      .then((sales)=>{
        console.log('sales '+sales);
        //   maps.set(sales.dataValues);
        //   promise.push(sales.dataValues)
        //   // promise.push(maps)
        //   // console.log(sales.dataValues)
        callback(sales);
      });
};

module.exports = auth;
