const StatusCodes = require("http-status-codes").StatusCodes;
const CustomError = require("./Custom");

class NotFoundError extends CustomError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.NOT_FOUND;
  }
}

module.exports = NotFoundError;