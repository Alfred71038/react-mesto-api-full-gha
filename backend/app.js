require('dotenv').config();

const express = require('express');

const bodyParser = require('body-parser');

const mongoose = require('mongoose');

const { PORT = 3000 } = process.env;

const cookieParser = require('cookie-parser');

const { errors } = require('celebrate');

const router = require('./routes');

const error = require('./middlewares/error');

const { requestLogger, errorLogger } = require('./middlewares/logger');

const app = express();

const cors = require('./middlewares/cors');

mongoose.connect('mongodb://127.0.0.1:27017/mestodb')
  .then(() => {
    // eslint-disable-next-line no-console
    console.log('Подключение к mongodb.');
  }).catch((err) => {
    // eslint-disable-next-line no-console
    console.log(`Ошибка при подключении к mongodb ${err.message}.`);
  });

app.use(requestLogger);

app.use(cors);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use(bodyParser.json());

app.use(cookieParser());

app.use(router);

app.use(errorLogger);

app.use(errors());

app.use(error);

// eslint-disable-next-line no-console
app.listen(PORT, () => console.log(`Подключение к порту ${PORT}!`));
