const axios = require('axios').default;

exports.verifytrans = (req, res, next) =>{
  console.log('body', req.body.sign);
  const URL = 'http://localhost:4033' + '/transaction/';
  const headers = {
    'Content-Type': 'application/json',
    'apikey': '123456',
    'apipassword': '123456',
  };
  axios({
    method: 'post',
    url: URL,
    headers,
    data: {
      trx_type: req.body.trx_type,
      sign: req.body.sign,
    },
  }).then((response) => {
    console.log('response', response.data);
    res.status(200).json(response.data);
  }).catch((err)=>{
    console.log(err.message);
  });
};
