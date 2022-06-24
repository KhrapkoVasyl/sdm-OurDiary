'use strict';

const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  try {
    const accessToken = req.headers.accesstoken;

    if (!accessToken) {
      return res.status(401).json({ message: 'The user is not authorized' });
    }

    const accessTokenSecret = process.env.TOKEN_SECRET;
    const payload = jwt.verify(accessToken, accessTokenSecret);
    req.userID = payload.userId;

    next();
  } catch (err) {
    if (err instanceof jwt.TokenExpiredError) {
      return res.status(401).json({ message: 'The access token expired' });
    }

    if (err instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({ message: 'Invalid access token' });
    }

    return res.status(400).json({ message: err.message });
  }
};
