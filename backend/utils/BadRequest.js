const { ERROR_CODE } = require('./errors');

class BadRequest extends Error {
  constructor(message) {
    super(message);
    this.statusCode = ERROR_CODE.BAD_REQUEST;
  }
}

module.exports = BadRequest;
