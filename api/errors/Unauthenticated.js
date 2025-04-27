const StatusCodes = require("http-status-codes").StatusCodes;
const CustomError = require("./Custom");

class UnauthenticatedError extends CustomError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.UNAUTHORIZED;
  }
}

module.exports = UnauthenticatedError;