const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');

const app = express();

const { auth } = require('./middlewares/auth');

const router = require('./routes/index');

const error = require('./middlewares/error');

const cors = require('./middlewares/cors');

const { requestLogger, errorLogger } = require('./middlewares/logger');

mongoose.connect('mongodb://127.0.0.1:27017/mestodb')
  .then(() => {
    console.log('Подключение к mongodb.');
  }).catch((err) => {
    console.log(`Ошибка при подключении к mongodb ${err.message}.`);
  });

app.use(bodyParser.json());

app.use(cors);

app.use(requestLogger);

app.use(router);

app.use(cookieParser());

app.use(auth);

app.use(errorLogger);

app.use(errors());

app.use(error);

app.listen(3000, () => console.log('Подключение к порту 3000!'));
