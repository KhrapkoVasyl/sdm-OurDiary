'use strict';

const db = require('../db/db');
const bcrypt = require('bcryptjs');

const comparePasswordsService = async (login, password) => {
  const user = await db.findUserByName(login);

  const bool = await bcrypt.compare(password, user.password);

  return bool;
};

module.exports = comparePasswordsService;
