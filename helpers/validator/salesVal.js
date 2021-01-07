const { check, validationResult, body } = require("express-validator");

exports.validCart = [
  body("*.id_goods")
    .notEmpty()
    .withMessage(["Please choose goods first!.", "Tolong pilih barang!."]),
  body("*.sug_goods_id")
    .notEmpty()
    .withMessage(["Please choose goods first!.", "Tolong pilih barang!."]),
  body("*.qty")
    .notEmpty()
    .withMessage(["Please insert quantity!.", "Tolong isi kuantitas!."]),
  // .isInt({ min: 1 })
  // .withMessage(["At least 1 quantity!.", "Minimal 1!."]),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const firstError = errors.array().map((error) => error.msg)[0];
      console.log(firstError);
      return res.status(200).json({
        status: 422,
        message: {
          eng: firstError[0],
          ind: firstError[1],
        },
        data: [],
      });
    }
    next();
  },
];

exports.validCheckout = [
  body("payment.cash")
    .notEmpty()
    .withMessage([
      "Please insert payment amount!.",
      "Mohon isi jumlah pembayaran!.",
    ]),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const firstError = errors.array().map((error) => error.msg)[0];
      console.log(firstError);
      return res.status(200).json({
        status: 422,
        message: {
          eng: firstError[0],
          ind: firstError[1],
        },
        data: [],
      });
    }
    next();
  },
];
