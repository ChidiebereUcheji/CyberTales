const StatusCodes = require("http-status-codes").StatusCodes;
const CustomError = require("./Custom");

class BadRequestError extends CustomError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.BAD_REQUEST;
  }
}

module.exports = BadRequestError;