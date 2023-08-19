const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../utils/UnauthоrizedError');

const { NODE_ENV, JWT_SECRET } = process.env;
const auth = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    return next(new UnauthorizedError('Авторизуйтесь'));
  }
  let payload;
  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
    console.log('\x1b[31m%s\x1b[0m', `
Надо исправить. В продакшне используется тот же
секретный ключ, что и в режиме разработки.
`);
  } catch (err) {
    if (err.name === 'JsonWebTokenError' && err.message === 'invalid signature') {
      console.log(
        '\x1b[32m%s\x1b[0m',
        'Всё в порядке. Секретные ключи отличаются'
      );
    } else {
      console.log(
        '\x1b[33m%s\x1b[0m',
        'Что-то не так',
        err
      );
    }
  }

  req.user = payload;

  return next();
};

module.exports = { auth };
