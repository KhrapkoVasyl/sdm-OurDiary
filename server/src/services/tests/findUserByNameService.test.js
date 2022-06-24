'use strict';

require('dotenv').config();

const path = require('path');
const fs = require('fs').promises;
const findUserByNameService = require('../findUserByNameService');
const db = require('../../db/db');

const { DB_TEST_MODE, DB_TEST_FOLDER } = process.env;

describe('getAllUserTasks service testing', () => {
  if (DB_TEST_MODE !== '1') {
    console.log(
      'Environment variable DB_TEST_MODE should be equal to "1" for testing '
    );
    process.exit(1);
  }
  const dirPath = path.join(__dirname, '..', '..', 'db', DB_TEST_FOLDER);

  let user;

  beforeEach(async () => {
    await db.connect();

    const userData = { name: 'Pepko', password: '12345678' };
    
    user = await db.insertUser(userData);
  });

  afterEach(async () => {
    await db.clearDB();
    await fs
      .rm(dirPath, { recursive: true, force: true })
      .catch(err => console.log(err));
  });

  test('Should find user by name', async () => {
    const userData = { login: 'Pepko'} 
    const user = await findUserByNameService(userData.login);
    expect(user.hasOwnProperty('id')).toBe(true);
    expect(user.hasOwnProperty('name')).toBe(true);
    expect(user.hasOwnProperty('password')).toBe(true);
    expect(user.id).toBe(0);
    expect(user.name).toBe("Pepko");
  });

  test('Should throw an error if user with this ID does not!', async () => {
    const userData = { login: 'Kepko'} 
    try {
      const user = await findUserByNameService(userData.login);
    } catch (err) {
      expect(err).not.toBe(undefined);
      expect(err.message).toBe('Incorrect login!');
    }
  });
});