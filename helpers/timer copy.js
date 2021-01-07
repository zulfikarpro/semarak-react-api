const moment = require("moment");
moment.tz.setDefault("Asia/Jakarta");

exports.today = () => {
  let today = moment().format();
  return today;
};

exports.today_two = () => {
  let today_two = moment().format("YYYYMMDD");
  return today_two;
};

exports.startDay = (date) => {
  let start_day = moment(date).startOf("day");
  return start_day;
};
exports.endDay = (date) => {
  let end_day = moment(date).endOf("day");
  return end_day;
};

exports.last_month = () => {
  let last_month = moment().startOf("month").format("YYYY-MM-DD");
  return last_month;
};
