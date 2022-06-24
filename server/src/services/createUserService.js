'use strict';

const db = require('../db/db');
const bcrypt = require('bcryptjs');

const createUserService = async (login, password) => {
  const user = await db.findUserByName(login);
  if (user) {
    throw new Error('User with the same name is already exists!');
  }

  const hashedPassword = bcrypt.hashSync(password, 7);

  const newUser = await db.insertUser({ name: login, password: hashedPassword });

  if (!newUser) {
    throw new Error('Failed to create User!');
  }

  return newUser;
};

module.exports = createUserService;
