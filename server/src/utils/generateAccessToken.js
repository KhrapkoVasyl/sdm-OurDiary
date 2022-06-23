const jwt = require('jsonwebtoken');

const generateAccessToken = (userId) => {
  const payload = { userId };
  const accessTokenSecret = process.env.tokenSecret;
  const sessionDuration = process.env.sessionDuration;

  return jwt.sign(payload, accessTokenSecret, { expiresIn: sessionDuration });
};

module.exports = generateAccessToken;
