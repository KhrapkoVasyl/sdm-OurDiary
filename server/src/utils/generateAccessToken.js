'use strict';

const jwt = require('jsonwebtoken');

const generateAccessToken = (userId) => {
  const payload = { userId };
  const accessTokenSecret = process.env.TOKEN_SECRET;
  const sessionDuration = process.env.SESSION_DURATION;

  return jwt.sign(payload, accessTokenSecret, { expiresIn: sessionDuration });
};

module.exports = generateAccessToken;
