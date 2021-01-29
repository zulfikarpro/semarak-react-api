const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();
const path = require('path');
const passport = require('passport');
const models = require('./models');

const {sequelize} = require('./models');

models.sequelize
// .sync()
    .authenticate()
    .then((aw) => {
      console.log(sequelize.getDatabaseName(), 'here, and ready to serve !');
    })
    .catch((err) => {
      console.log(err);
    });

app.use(cors());
app.use(express.json());
app.use(passport.initialize());
app.use('/public', express.static(path.join(__dirname, 'public')));

app.use('/API/auth', require('./routes/API/auth'));
app.use('/API/transaction', require('./routes/API/transaction'));
app.use('/API/indo', require('./routes/API/geo/indo'));
app.use(function(req, res, next) {
  res.status(404).send('Oops! Where are you going ?');
});
let port = 5021;

if (process.env.NODE_ENV === 'production') {
  port = 5021;
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

app.listen(port, () => {
  console.log('Server Running : ', port);
});
