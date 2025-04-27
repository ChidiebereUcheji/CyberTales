const jwt = require('jsonwebtoken');

exports.createJWT = ({ payload }) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET, { algorithm: 'HS256' });
  return token;
};

exports.isTokenValid = ({ token }) => jwt.verify(token, process.env.JWT_SECRET);