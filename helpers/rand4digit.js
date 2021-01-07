function rand4digit() {
  let otp_code = Math.floor(1000 + Math.random() * 9000);

  return otp_code;
}

module.exports = rand4digit;
