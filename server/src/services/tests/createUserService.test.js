'use strict';

require('dotenv').config();

const path = require('path');
const fs = require('fs').promises;
const createUserService = require('../createUserService');
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

  test('Should create a new user', async () => {
    const userData = { login: 'Kepko', password: '12345678'} 
    const newUser = await createUserService(userData.login, userData.password);
    expect(newUser.hasOwnProperty('id')).toBe(true);
    expect(newUser.hasOwnProperty('name')).toBe(true);
    expect(newUser.hasOwnProperty('password')).toBe(true);
    expect(newUser.id).toBe(1);
    expect(newUser.name).toBe("Kepko");
  });

  test('Should throw an error: User with the same name is already exists!', async () => {
    const userData = { login: 'Pepko', password: '12345678'} 
    try {
      const newUser = await createUserService(userData.login, userData.password);
    } catch (err) {
      expect(err).not.toBe(undefined);
      expect(err.message).toBe('User with the same name is already exists!');
    }
  });
});