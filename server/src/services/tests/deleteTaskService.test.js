'use strict';

require('dotenv').config();

const path = require('path');
const fs = require('fs').promises;
const createTaskService = require('../createTaskService');
const createUserService = require('../createUserService');
const deleteTaskService = require('../deleteTaskService');
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
  let task;

  beforeEach(async () => {
    await db.connect();

    const userData = { login: 'Pepko', password: '12345678' };
    
    user = await createUserService(userData.login, userData.password);

    const taskData = { title: "task1", description: "abc", isDone: false}

    task = await createTaskService({userID: user.id, ...taskData});
  });

  afterEach(async () => {
    await db.clearDB();
    await fs
      .rm(dirPath, { recursive: true, force: true })
      .catch(err => console.log(err));
  });

  test('Should delete task by id', async () => {
    const id = task.id;
    const userID = user.id;
    const deletedTask = await deleteTaskService(userID, id);
    expect(deletedTask.hasOwnProperty('id')).toBe(true);
    expect(deletedTask.hasOwnProperty('userID')).toBe(true);
    expect(deletedTask.hasOwnProperty('title')).toBe(true);
    expect(deletedTask.hasOwnProperty('description')).toBe(true);
    expect(deletedTask.hasOwnProperty('isDone')).toBe(true);
    expect(deletedTask.hasOwnProperty('completionDate')).toBe(true);
    expect(deletedTask.hasOwnProperty('deadline')).toBe(true);
    expect(deletedTask.id).toBe(0);
    expect(deletedTask.userID).toBe(0);
    expect(deletedTask.title).toBe('task1');
    expect(deletedTask.description).toBe('abc');
    expect(deletedTask.isDone).toBe(false);
    expect(deletedTask.completionDate).toBe(null);
    expect(deletedTask.deadline).toBe(null);
  });

  test('Should throw an error if task with specified ID does not exists!', async () => {
    const id = 100;
    const userID = user.id;
    try {
      const deletedTask = await deleteTaskService(userID, id);
    } catch (err) {
      expect(err).not.toBe(undefined);
      expect(err.message).toBe('Task with this ID does not exists!');
    }
  });

  test('Should throw an error if try to delete task which does not belongs to user!', async () => {
    const id = task.id;
    const userID = 2;
    try {
      const deletedTask = await deleteTaskService(userID, id);
    } catch (err) {
      expect(err).not.toBe(undefined);
      expect(err.message).toBe('This task does not belongs to user or does not exists!');
    }
  });
});