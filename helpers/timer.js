/* eslint-disable camelcase */
const moment = require('moment');
moment.tz.setDefault('Asia/Jakarta');

exports.today = () => {
  const today = moment().format();
  return today;
};

exports.today_two = () => {
  const today_two = moment().format('YYYYMMDD');
  return today_two;
};

exports.startDay = (date) => {
  const start_day = moment(date).startOf('day');
  return start_day;
};
exports.endDay = (date) => {
  const end_day = moment(date).endOf('day');
  return end_day;
};

exports.last_month = () => {
  const last_month = moment().startOf('month').format('YYYY-MM-DD');
  return last_month;
};
