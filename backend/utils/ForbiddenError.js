const { ERROR_CODE } = require('./errors');

class ForbiddenError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = ERROR_CODE.FORBIDDEN_ERROR;
  }
}

module.exports = ForbiddenError;
