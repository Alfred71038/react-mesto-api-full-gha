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
  } catch (err) {
    return next(new UnauthorizedError('Авторизуйтесь'));
  }

  req.user = payload;

  return next();
};

module.exports = { auth };
