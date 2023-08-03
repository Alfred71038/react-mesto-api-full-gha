const express = require('express');
const mongoose = require('mongoose');

const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const celebrate = require('./middlewares/celebrate');

const app = express();

const { auth } = require('./middlewares/auth');

const router = require('./routes/index');

const error = require('./middlewares/error');

const cors = require('./middlewares/cors');

const { createUser, login } = require('./controllers/users');

const { requestLogger, errorLogger } = require('./middlewares/logger');

mongoose.connect('mongodb://127.0.0.1:27017/mestodb')
  .then(() => {
    console.log('Подключение к mongodb.');
  }).catch((err) => {
    console.log(`Ошибка при подключении к mongodb ${err.message}.`);
  });

app.use(express.json());

app.use(cors);

app.use(requestLogger);

app.post('/signin', celebrate.celebrateLogin, login);

app.post('/signup', celebrate.celebrateCreateUser, createUser);

app.use(router);

app.use(cookieParser());
app.use(auth);
app.get('/signout', (req, res) => {
  res.clearCookie('jwt').send({ message: 'Выход' });
});

app.use(errorLogger);
app.use(errors());
app.use(error);

app.listen(3000, () => console.log('Подключение к порту 3000!'));
