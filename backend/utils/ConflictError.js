const { ERROR_CODE } = require('./errors');

class ConflictError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = ERROR_CODE.CONFLICT_ERROR;
  }
}

module.exports = ConflictError;
