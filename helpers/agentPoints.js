const moment = require("moment");
moment.tz.setDefault("Asia/Jakarta");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { sequelize } = require("../models");
const { today, last_month } = require("../helpers/timer");

var models = require("../models");
var trx_user_points = models.trx_user_points;
var trx_agent_po = models.trx_agent_po;

exports.agent_points = (agent_id) => {
  let total = 0;
  let balance = 0;
  let point = 0;
  let last_point = 0;
  let query = null;
  trx_user_points
    .findOne({
      where: {
        agent_id: agent_id,
        // traffic: "credit",
      },
      order: [["id", "desc"]],
      limit: 1,
    })
    .then((points) => {
      if (!points) {
        query = {
          group: ["agent_id", "id"],
          where: {
            agent_id: agent_id,
          },
          attributes: [
            "id",
            "agent_id",
            [sequelize.fn("SUM", sequelize.col("total_price")), "total"],
          ],
          raw: true,
        };
      } else {
        query = {
          group: ["agent_id", "id"],
          where: {
            agent_id: agent_id,
            id: {
              [Op.gte]: points.trx_id,
            },
          },
          attributes: [
            "id",
            "agent_id",
            [sequelize.fn("SUM", sequelize.col("total_price")), "total"],
          ],
        };
        balance = points.balance;
        last_point = points.last_point;
      }
      return query;
    })
    .then(() => {
      return trx_agent_po.findAll(query).then((data) => {
        data.map((item) => {
          total += item.total;
        });
        balance += total % process.env.LIMIT_POINT_AGENT;
        point = Math.floor(total / process.env.LIMIT_POINT_AGENT) * 10;
        // console.log(
        //   total,
        //   balance,
        //   point,
        //   JSON.stringify(data[data.length - 1].id)
        // );
        return data;
      });
    })
    .then((data) => {
      // if (point > 0) {
      trx_user_points.create({
        user_id: agent_id,
        point: point,
        balance: balance,
        last_point: last_point + point,
        traffic: "credit",
        trx_id: data[data.length - 1].id,
        created_by: agent_id,
        created_at: today(),
      });
      // }
    });
};
// trx_agent_po
// .findAll({
//   group: ["agent_id", "id"],
//   where: {
//     agent_id: agent_id,
//     id: {
//       [Op.gte]: sequelize.literal(
//         `(SELECT id FROM trx_agent_po WHERE point != 0 AND agent_id = ${agent_id} ORDER BY id LIMIT 1 DESC)`
//       ),
//     },
//   },
//   attributes: [
//     "id",
//     "agent_id",
//     [sequelize.fn("SUM", sequelize.col("total_price")), "total"],
//   ],
// })
// .then((data) => {
//   console.log(JSON.stringify(data, null, 2));
// });
