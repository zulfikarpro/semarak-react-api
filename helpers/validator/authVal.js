const {body, validationResult, oneOf, header} = require('express-validator');
exports.validSecReg = [
  body('id_number')
      .notEmpty()
      .withMessage([
        'Please insert your ID number!.',
        'Mohon isi no identitas anda!.',
      ]),
  body('id_type')
      .notEmpty()
      .withMessage([
        'Please insert your ID type!.',
        'Mohon isi tipe identitas anda!.',
      ]),
  body('file_name')
      .notEmpty()
      .withMessage(['Please insert photo profile!.', 'Mohon isi foto profil!.']),
  body('store_name')
      .notEmpty()
      .withMessage([
        'Please insert your store name!.',
        'Mohon isi nama toko anda!.',
      ]),
  body('long_lat')
      .notEmpty()
      .withMessage([
        'Please insert your store location!.',
        'Mohon isi lokasi toko anda!.',
      ]),
  body('full_name')
      .notEmpty()
      .withMessage([
        'Please insert your full name!.',
        'Mohon isi nama lengkap anda!.',
      ]),
  body('left_store')
      .notEmpty()
      .withMessage([
        'Please insert your left store photo!.',
        'Mohon isi foto bagian kiri toko anda!.',
      ]),
  body('front_store')
      .notEmpty()
      .withMessage([
        'Please insert your front store photo!.',
        'Mohon isi foto bagian depan toko anda!.',
      ]),
  body('right_store')
      .notEmpty()
      .withMessage([
        'Please insert your right store photo!.',
        'Mohon isi foto bagian kanan toko anda!.',
      ]),
  body('id_photo')
      .notEmpty()
      .withMessage([
        'Please insert your ID card photo!.',
        'Mohon isi foto identitas anda!.',
      ]),
  body('regency_id')
      .notEmpty()
      .withMessage([
        'Please insert your store regency!.',
        'Mohon isi kabupaten toko anda!.',
      ]),
  body('province_id')
      .notEmpty()
      .withMessage([
        'Please insert your store province!.',
        'Mohon isi propinsi toko anda!.',
      ]),
  body('district_id')
      .notEmpty()
      .withMessage([
        'Please insert your store district!.',
        'Mohon isi kota toko anda!.',
      ]),
  body('village_id')
      .notEmpty()
      .withMessage([
        'Please insert your store village!.',
        'Mohon isi desa toko anda!.',
      ]),
  body('marital_id')
      .notEmpty()
      .withMessage([
        'Please insert your store region!.',
        'Mohon isi kota toko anda!.',
      ]),
  body('gender_id')
      .notEmpty()
      .withMessage([
        'Please insert your store region!.',
        'Mohon isi kota toko anda!.',
      ]),
  body('residential_id')
      .notEmpty()
      .withMessage([
        'Please insert your store region!.',
        'Mohon isi kota toko anda!.',
      ]),
  body('residential_entry')
      .notEmpty()
      .withMessage([
        'Please insert your store region!.',
        'Mohon isi kota toko anda!.',
      ]),
  body('religion_id')
      .notEmpty()
      .withMessage([
        'Please insert your store region!.',
        'Mohon isi kota toko anda!.',
      ]),
  body('citizenship_id')
      .notEmpty()
      .withMessage([
        'Please insert your store region!.',
        'Mohon isi kota toko anda!.',
      ]),
  body('street')
      .notEmpty()
      .withMessage([
        'Please insert your store street!.',
        'Mohon isi nama jalan tooko anda!.',
      ]),
  body('rt')
      .notEmpty()
      .withMessage([
        'Please insert your RT store!.',
        'Mohon isi nomer RT toko anda!.',
      ]),
  body('rw')
      .notEmpty()
      .withMessage([
        'Please insert your RW store!.',
        'Mohon isi nomer RW toko anda!.',
      ]),
  body('number')
      .notEmpty()
      .withMessage([
        'Please insert your number store!.',
        'Mohon isi nomer toko anda!.',
      ]),
  body('owner_address')
      .notEmpty()
      .withMessage([
        'Please insert full address of your home!.',
        'Mohon isi alamat lengkap rumah anda!.',
      ]),
  body('age')
      .notEmpty()
      .withMessage(['Please insert your age!.', 'Mohon isi umur anda!.']),
  body('birth_date')
      .notEmpty()
      .withMessage([
        'Please insert your birthdate!.',
        'Mohon isi tanggal lahir!.',
      ]),
  body('birth_place')
      .notEmpty()
      .withMessage([
        'Please insert your birthplace!.',
        'Mohon isi tempat lahir anda!.',
      ]),
  body('postal_code')
      .notEmpty()
      .withMessage([
        'Please insert your postal code store!.',
        'Mohon isi kode pos toko anda!.',
      ]),
  (req, res, next) => {
    const errors = validationResult(req);
    console.log(errors);
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

exports.validFirstReg = [
  body('email')
      .notEmpty()
      .withMessage(['Please insert your email!.', 'Mohon isi email anda!.'])
      .isEmail()
      .withMessage(['Email incorrect!.', 'Email salah!.']),
  body('phone')
      .notEmpty()
      .withMessage(['Please insert your phone!.', 'Mohon isi no HP anda!.']),
  body('alias')
      .notEmpty()
      .withMessage(['Please insert your alias!.', 'Mohon isi alias anda!.']),
  body('password')
      .notEmpty()
      .withMessage(['Please insert your passwrod!.', 'Mohon isi sandi anda!.'])
      .isLength({
        min: 6,
        max: 64,
      })
      .withMessage([
        'Password min is 6 and max is 64!.',
        'Minimal password 6 dan maksimal 64!.',
      ]),
  body('re_password')
      .notEmpty()
      .withMessage(['Please re-type your password!.', 'Mohon isi ulang sandi!.'])
      .isLength({
        min: 6,
        max: 64,
      })
      .withMessage([
        'Password min is 6 and max is 64!.',
        'Minimal password 6 dan maksimal 64!.',
      ]),
  (req, res, next) => {
    const errors = validationResult(req);
    console.log(errors);
    if (!errors.isEmpty()) {
      const firstError = errors.array().map((error) => error.msg)[0];
      console.log(firstError);
      return res.status(200).json({
        message: {
          eng: firstError[0],
          ind: firstError[1],
        },
        status: 422,
        data: {},
      });
    }
    next();
  },
];

exports.validLogin = [
  oneOf(
      [body('email').exists(), body('phone').exists()],
      [
        'You must enter phone number or email!.',
        'Anda harus mengisi No. HP atau email!.',
      ],
  ),
  body('email').isEmail().withMessage(['Email incorrect!.', 'Email salah!.']),
  body('password')
      .notEmpty()
      .withMessage(['Please fill your password!.', 'Mohon isi sandi anda!.']),
  body('password')
      .isLength({
        min: 6,
      })
      .withMessage([
        'Password must contain at least 6 characters!.',
        'Kata sandi minimal 6 huruf!.',
      ]),
  (req, res, next) => {
    const errors = validationResult(req);
    console.log(errors);
    if (!errors.isEmpty()) {
      const firstError = errors.array().map((error) => error.msg)[0];
      console.log(firstError);
      return res.status(200).json({
        message: {
          eng: firstError[0],
          ind: firstError[1],
        },
        status: 422,
        data: {},
      });
    }
    next();
  },
];

exports.validVerify = [
  body('phone')
      .notEmpty()
      .withMessage([
        'Please insert your phone number!',
        'Mohon isi nomor HP anda!.',
      ]),
  // body("phone")
  //   .matches(/^62/)
  //   .withMessage([
  //     "Phone number must contain country code!.",
  //     "Nomor HP harus dengan kode negara!.",
  //   ]),
  body('code')
      .notEmpty()
      .withMessage(['Please insert OTP code!', 'Mohon isi kode OTP!.']),
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

exports.validForgotPwd = [
  body('phone')
      .notEmpty()
      .withMessage([
        'Please insert your phone number!',
        'Mohon isi nomor HP anda!.',
      ]),
  body('code')
      .notEmpty()
      .withMessage([
        'Please insert OTP code sent to your number!',
        'Mohon isi OTP yang telah dikirimkan ke nomor anda!.',
      ])
      .isLength({
        min: 4,
        max: 4,
      })
      .withMessage(['OTP length is 4!', 'OTP 4 digit!.']),
  body('new_password')
      .notEmpty()
      .withMessage([
        'Please insert your new password!',
        'Mohon isi sandi baru anda!.',
      ])
      .isLength({
        min: 6,
      }),

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

// exports.validRefreshToken = [
//   header("x-refresh-token")
//     .notEmpty()
//     .withMessage(["You are not authorized!", "Anda tidak memiliki akses!."]),
//   (req, res, next) => {
//     const errors = validationResult(req);
//     console.log(errors);
//     if (!errors.isEmpty()) {
//       const firstError = errors.array().map((error) => error.msg)[0];
//       console.log(firstError);
//       return res.status(200).json({
//         status: 422,
//         message: {
//           eng: firstError[0],
//           ind: firstError[1],
//         },
//         data: [],
//       });
//     }
//     next();
//   },
// ];
