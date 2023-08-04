const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../utils/UnauthоrizedError');

const auth = (req, res, next) => {
  const token = req.cookies.jwt;
  let payload;
  if (!token) {
    next(new UnauthorizedError('Жопа'));
  }
  try {
    payload = jwt.verify(token, 'super_strong_password');
  } catch (err) {
    next(new UnauthorizedError('Жопа'));
  }

  req.user = payload;

  return next();
};

module.exports = { auth };
