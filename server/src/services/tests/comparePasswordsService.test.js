'use strict';

require('dotenv').config();

const path = require('path');
const fs = require('fs').promises;
const comparePasswordsService = require('../comparePasswordsService');
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

    const userData = { login: 'Pepko', password: '12345678' };
    
    user = await createUserService(userData.login, userData.password);
  });

  afterEach(async () => {
    await db.clearDB();
    await fs
      .rm(dirPath, { recursive: true, force: true })
      .catch(err => console.log(err));
  });

  test('Should return true if user entered correct password', async () => {
    const userData = { login: 'Pepko', password: '12345678'} 
    const bool = await comparePasswordsService(userData.login, userData.password);
    expect(bool).toBe(true);
  });

  test('Should return false if user entered wrong password', async () => {
    const userData = { login: 'Pepko', password: 'wrong-password'} 
    const bool = await comparePasswordsService(userData.login, userData.password);
    expect(bool).toBe(false);
  });
});