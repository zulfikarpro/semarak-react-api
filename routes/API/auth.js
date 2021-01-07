/* eslint-disable camelcase */
const express = require('express');
const router = express.Router();
// const upload = require('../../middlewares/upload');
// const auth = require("../../middleware/auth");
// const {} = require("../../helpers/validation");
const {
  checkingcredentialregister,
  register,
  login,
  tesUpload,
  // verify,
  // refresh_token,
  // profile,
  // first_reg,
  // sec_reg,
  // resend_otp,
  residential,
  religion,
  // send_forgot_token,
  // forgot_password,
} = require('../../controllers/AuthController');
const {
  validLogin,
  // validSecReg,
  // validVerify,
  // validFirstReg,
  // validForgotPwd,
} = require('../../helpers/validator/authVal');
const auth = require('../../middlewares/auth');
// const agentDetail = require('../../middlewares/agentDetail');
// const OTPreset = require('../../middlewares/OTPreset');
// const OTPregister = require('../../middlewares/OTPregister');
router.post('/register', auth, register);
router.post('/upload', tesUpload);
// router.get("/register", register);
// router.post('/register/first', validFirstReg, first_reg);
// router.post('/register/second', validSecReg, agentDetail, sec_reg);
// router.get('/profile', auth, profile);
// router.post('/profile', auth, profile);
router.post('/checkreg', auth, checkingcredentialregister);
router.post('/login', validLogin, login);
// router.get('/token', refresh_token);
// router.post('/verify', validVerify, verify);
// router.post('/resend_otp', OTPregister, resend_otp);
router.get('/residential', residential);
router.get('/religion', religion);
// router.post("/forgot_password", OTPreset, send_forgot_token);
// router.post('/forgot_password', OTPreset, send_forgot_token);
// router.post('/forgot_password/verify', validForgotPwd, forgot_password);

// router.get("/", auth, detail, (req, res) => {
//   res.json(req.auth);
// });

module.exports = router;
