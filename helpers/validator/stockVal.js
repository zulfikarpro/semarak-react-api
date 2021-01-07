const { validationResult, body, query } = require("express-validator");
exports.ValidGoodsDetail = [
  query("goods_id")
    .notEmpty()
    .withMessage(["Please choose goods first!.", "Tolong pilih barang!."]),
  query("sug_goods_id")
    .notEmpty()
    .withMessage(["Please choose goods first!.", "Tolong pilih barang!."]),
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
