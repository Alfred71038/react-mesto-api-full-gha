const { ERROR_CODE } = require('./errors');

class NotFound extends Error {
  constructor(message) {
    super(message);
    this.statusCode = ERROR_CODE.NOT_FOUND;
  }
}

module.exports = NotFound;
