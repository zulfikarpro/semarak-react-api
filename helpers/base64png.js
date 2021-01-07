var fs = require("fs");
var path = require("path");

function base64ToPNG(data, dir) {
  data = data.replace(/^data:image\/png;base64,/, "");

  fs.writeFile(path.resolve(__dirname, dir), data, "base64", function (err) {
    if (err) throw err;
  });
}

module.exports = base64ToPNG;

// {
//   "email" :"",
//   "phone":"",
//   "old_password":"", //tiap mau update user cred harus masukin ini
//   "new_password":"",
//   "re_password":"",

// //diatas comment ini buat ganti user credentiall//
// //jadi klo lo ngisi email brrti lo ngupdate user cred
// //dibawah comment ini buat ganti agent credentiall//

//   "file_name":"base64/fotoprofil/udah",
//   "name":"",
//   "id_number":"",
//   "id_type":"",
//   "id_photo":"",
//   "age":"",
//   "birth_date":"",
//   "birth_place":"",
//   "region":"",
//   "nationality":"",
//   "village":"",
//   "sub_district":"",
//   "street":"",
//   "rt":"",
//   "rw":"",
//   "number":"",
//   "postal_code":"",
//   "store_name":"",
//   "front_store":"base64/belom",
//   "left_store":"base64/belom",
//   "right_store":"base64/belom"
// }

//     (err, result) => {
//       if (err) {
//         console.log(err);
//         throw {
//           name: "Custom",
//           message: {
//             eng: "Oops! Failed to send OTP. please retry!.",
//             ind: "Oops! Gagal mengirimkan OTP.",
//           },
//         };
//       } else {
//         res.status(200).json({
//           otp_req_id: result.request_id,
//           message: {
//             eng: "We've send OTP to your number.",
//             ind: "OTP telah terkirim.",
//           },
//           data: [],
//         });
//       }
//     }
//   );
// } else {
//   throw {
//     name: "Custom",
//     message: {
//       eng:
//         "Oops! Your phone is not registered yet. Please register instead!.",
//       ind: "Oops! Nomer belum teregistrasi,",
//     },
//   };
// }
