'use strict';

const db = require('../db/db');

const createUserService = async (login, password) => {
  const user = await db.findUserByName(login);
  if (user) {
    throw new Error('User with the same name is already exists!');
  }

  const newUser = await db.insertUser({ name: login, password });

  if (!newUser) {
    throw new Error('Failed to create User!');
  }

  return newUser.id;
};

module.exports = createUserService;
