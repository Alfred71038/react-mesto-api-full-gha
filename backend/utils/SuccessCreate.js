const { ERROR_CODE } = require('./errors');

class SeccessCreate extends Error {
  constructor(message) {
    super(message);
    this.statusCode = ERROR_CODE.SUCCESS_CREATE;
  }
}

module.exports = SeccessCreate;
