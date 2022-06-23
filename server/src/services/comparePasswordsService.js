'use strict';

const db = require('../db/db');

const comparePasswordsService = async (login, password) => {
  const User = await db.findUserByName(login);

  return password === User.password ? true : false;
};

module.exports = comparePasswordsService;
