const express = require('express');

const mongoose = require('mongoose');

const bodyParser = require('body-parser');

const cookieParser = require('cookie-parser');

const { PORT = 3000 } = process.env;

const app = express();

const { errors } = require('celebrate');

const router = require('./routes/index');

const error = require('./middlewares/error');

mongoose.connect('mongodb://127.0.0.1:27017/mestodb')
  .then(() => {
    console.log('Подключение к mongodb.');
  }).catch((err) => {
    console.log(`Ошибка при подключении к mongodb ${err.message}.`);
  });

app.use(bodyParser.json());

app.use(cookieParser());

app.use(router);

app.use(errors());

app.use(error);

app.listen(PORT, () => console.log(`Подключение к порту ${PORT}!`));
