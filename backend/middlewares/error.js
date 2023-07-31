const { ERROR_CODE } = require('../utils/errors');

const error = (err, req, res, next) => {
  if (!err.statusCode) {
    res.status(ERROR_CODE.INTERNAL_SERVER_ERROR).send({ message: 'Ошибка на сервере' });
  } else {
    res.status(err.statusCode).send({ message: err.message });
  }
  next();
};

module.exports = error;
