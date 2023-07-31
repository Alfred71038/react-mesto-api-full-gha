const { ERROR_CODE } = require('./errors');

class UnauthоrizedError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = ERROR_CODE.UNAUTHORIZED_ERROR;
  }
}

module.exports = UnauthоrizedError;
