'use strict';

const db = require('../db/db');

const comparePasswordsService = async (login, password) => {
  const user = await db.findUserByName(login);

  return password === user.password ? true : false;
};

module.exports = comparePasswordsService;
