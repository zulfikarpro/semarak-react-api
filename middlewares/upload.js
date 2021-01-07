const multer = require('multer');

const storage = multer.diskStorage({
  destination: './public/uploads/',
  filename: (req, cb, file)=>{
    cb(null, file.fieldname + '-' +Date, now() +
    path.extname(file.originalname));
    console.log('filename', filename);
  },
});


const upload = () => multer({
  storage: storage,
}).single('myImage');

exports.upload = upload;


