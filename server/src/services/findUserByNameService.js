'use strict';

const db = require('../db/db');

const findUserByNameService = async (login) => {
  const User = await db.findUserByName(login);
  if (!User) {
    throw new Error("Incorrect login!")
  }

  return User;
};

module.exports = findUserByNameService;
