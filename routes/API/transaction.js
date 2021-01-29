/* eslint-disable new-cap */
/* eslint-disable camelcase */
const express = require('express');
const router = express.Router();

const {
  verifytrans,
} = require('../../controllers/transactionController');


router.post('/verify', verifytrans);

module.exports = router;
