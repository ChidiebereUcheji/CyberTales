const userTokenPayload = (user) => {
    return { username: user.name, userId: user._id, email: user.email };
  };
  
module.exports = userTokenPayload;