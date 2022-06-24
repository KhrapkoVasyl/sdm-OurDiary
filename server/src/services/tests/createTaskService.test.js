'use strict';

require('dotenv').config();

const path = require('path');
const fs = require('fs').promises;
const createTaskService = require('../createTaskService');
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

  test('Should create a new task', async () => {
    const taskData = { title: "task1", description: "abc", isDone: false} 
    const task = await createTaskService({userID: user.id, ...taskData});
    expect(task.hasOwnProperty('id')).toBe(true);
    expect(task.hasOwnProperty('userID')).toBe(true);
    expect(task.hasOwnProperty('title')).toBe(true);
    expect(task.hasOwnProperty('description')).toBe(true);
    expect(task.hasOwnProperty('isDone')).toBe(true);
    expect(task.hasOwnProperty('completionDate')).toBe(true);
    expect(task.hasOwnProperty('deadline')).toBe(true);
    expect(task.id).toBe(0);
    expect(task.userID).toBe(0);
    expect(task.title).toBe('task1');
    expect(task.description).toBe('abc');
    expect(task.isDone).toBe(false);
    expect(task.completionDate).toBe(null);
    expect(task.deadline).toBe(null);
  });

  test('Should throw an error if user with this ID does not exists!', async () => {
    const taskData = { title: "task1", description: "abc", isDone: false} 
    try {
      const task = await createTaskService({userID: 100, ...taskData});
    } catch (err) {
      expect(err).not.toBe(undefined);
      expect(err.message).toBe('Trying to assign a task to an inexisting user');
    }
  });
});