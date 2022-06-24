'use strict';

require('dotenv').config();

const path = require('path');
const fs = require('fs').promises;
const createTaskService = require('../createTaskService');
const createUserService = require('../createUserService');
const toggleTaskService = require('../toggleTaskService');
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
  let task2;

  beforeEach(async () => {
    await db.connect();

    const userData = { login: 'Pepko', password: '12345678' };
    
    user = await createUserService(userData.login, userData.password);

    const taskData = { title: "task1", description: "abc", isDone: false}
    const taskData2 = { title: "task1", description: "abc", isDone: true}

    task = await createTaskService({userID: user.id, ...taskData});
    task2 = await createTaskService({userID: user.id, ...taskData2});
  });

  afterEach(async () => {
    await db.clearDB();
    await fs
      .rm(dirPath, { recursive: true, force: true })
      .catch(err => console.log(err));
  });

  test('Should toggle task by id, (change isDone: false to true)', async () => {
    const taskID = task.id;
    const userID = user.id;
    const updatedTask = await toggleTaskService(userID, taskID);
    expect(updatedTask.hasOwnProperty('id')).toBe(true);
    expect(updatedTask.hasOwnProperty('userID')).toBe(true);
    expect(updatedTask.hasOwnProperty('title')).toBe(true);
    expect(updatedTask.hasOwnProperty('description')).toBe(true);
    expect(updatedTask.hasOwnProperty('isDone')).toBe(true);
    expect(updatedTask.hasOwnProperty('completionDate')).toBe(true);
    expect(updatedTask.hasOwnProperty('deadline')).toBe(true);
    expect(updatedTask.id).toBe(0);
    expect(updatedTask.userID).toBe(0);
    expect(updatedTask.title).toBe('task1');
    expect(updatedTask.description).toBe('abc');
    expect(updatedTask.isDone).toBe(true);
    expect(updatedTask.deadline).toBe(null);
  });

  test('Should toggle task by id, (change isDone: true to false)', async () => {
    const taskID = task2.id;
    const userID = user.id;
    const updatedTask = await toggleTaskService(userID, taskID);
    expect(updatedTask.hasOwnProperty('id')).toBe(true);
    expect(updatedTask.hasOwnProperty('userID')).toBe(true);
    expect(updatedTask.hasOwnProperty('title')).toBe(true);
    expect(updatedTask.hasOwnProperty('description')).toBe(true);
    expect(updatedTask.hasOwnProperty('isDone')).toBe(true);
    expect(updatedTask.hasOwnProperty('completionDate')).toBe(true);
    expect(updatedTask.hasOwnProperty('deadline')).toBe(true);
    expect(updatedTask.id).toBe(1);
    expect(updatedTask.userID).toBe(0);
    expect(updatedTask.title).toBe('task1');
    expect(updatedTask.description).toBe('abc');
    expect(updatedTask.isDone).toBe(false);
    expect(updatedTask.deadline).toBe(null);
  });

  test('Should throw an error if task with specified ID does not exists!', async () => {
    const taskID = 100;
    const userID = user.id;
    try {
      const updatedTask = await toggleTaskService(userID, taskID);    
    } catch (err) {
      expect(err).not.toBe(undefined);
      expect(err.message).toBe('Task with this ID does not exists!');
    }
  });

  test('Should throw an error if try to toggle task which does not belongs to user!', async () => {
    const taskID = task.id;
    const userID = 100;
    try {
      const updatedTask = await toggleTaskService(userID, taskID);    
    } catch (err) {
      expect(err).not.toBe(undefined);
      expect(err.message).toBe('This task does not belongs to user or does not exists!');
    }
  });
});