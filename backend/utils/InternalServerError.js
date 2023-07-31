const { ERROR_CODE } = require('./errors');

class InternalServerError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = ERROR_CODE.INTERNAL_SERVER_ERROR;
  }
}

module.exports = InternalServerError;
