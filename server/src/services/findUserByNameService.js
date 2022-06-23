'use strict';

const db = require('../db/db');

const findUserByNameService = async (login) => {
  const user = await db.findUserByName(login);
  if (!user) {
    throw new Error("Incorrect login!")
  }

  return user;
};

module.exports = findUserByNameService;
