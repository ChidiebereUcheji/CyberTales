const UnauthorizedError = require("../errors/Unauthorized.js");

const authorizeUser = (currentUser, currentUserId) => {
  if (currentUser.userId === currentUserId.toString()) return;
  throw new UnauthorizedError(
    "You are not authorized to access these resource"
  );
};

module.exports = authorizeUser;