const { body, validationResult, oneOf, header } = require("express-validator");

exports.validSuggGoods = [
  body("dc_price")
    .notEmpty()
    .withMessage(["Please insert buy price!", "Mohon isi harga beli!."]),
  body("price")
    .notEmpty()
    .withMessage(["Please insert sell price!", "Mohon isi harga jual!."]),
  body("buff_stock")
    .notEmpty()
    .withMessage(["Please insert buffer stock!", "Mohon isi stok buffer!."]),
  body("stock")
    .notEmpty()
    .withMessage(["Please insert current stock!", "Mohon isi stok sekarang!."]),
  (req, res, next) => {
    const errors = validationResult(req);
    // console.log(errors);
    if (!errors.isEmpty()) {
      const firstError = errors.array().map((error) => error.msg)[0];
      // console.log(firstError);
      return res.status(200).json({
        status: 422,
        message: {
          eng: firstError[0],
          ind: firstError[1],
        },
        data: {},
      });
    }
    next();
  },
];
