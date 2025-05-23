const StatusCodes = require("http-status-codes").StatusCodes;
const CustomError = require("./Custom");

class UnauthorizedError extends CustomError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.FORBIDDEN;
  }
}

module.exports = UnauthorizedError;