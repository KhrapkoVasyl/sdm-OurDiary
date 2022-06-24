/* eslint-disable max-len */
'use strict';

require('dotenv').config;
const path = require('path');
const fs = require('fs').promises;
const getAllUserTasks = require('../getAllUserTasksService');
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
  let task1;
  let task2;
  let task3;
  let task4;
  beforeEach(async () => {
    await db.connect();

    const userData = { name: 'test', password: '123' };
    const taskData1 = {
      title: 'task1',
      isDone: false,
      deadline: '2022-02-24T10:59:39.161Z',
    };
    const taskData2 = {
      title: 'task2',
      isDone: true,
      deadline: '2022-01-11T10:59:39.161Z',
    };
    const taskData3 = {
      title: 'task3',
      isDone: false,
      deadline: '3023-02-24T10:59:39.161Z',
    };
    const taskData4 = {
      title: 'task1',
      isDone: true,
      deadline: '3022-02-24T10:59:39.161Z',
    };
    user = await db.insertUser(userData); //preparing user to use for userID in task
    task1 = await db.insertTask({ ...taskData1, userID: user.id });
    task2 = await db.insertTask({ ...taskData2, userID: user.id });
    task3 = await db.insertTask({ ...taskData3, userID: user.id });
    task4 = await db.insertTask({ ...taskData4, userID: user.id });
  });

  afterEach(async () => {
    await db.clearDB();
    await fs
      .rm(dirPath, { recursive: true, force: true })
      .catch(err => console.log(err));
  });

  test('Should throw an error if userID is not specified', async () => {
    try {
      console.log(await getAllUserTasks(-1));
    } catch (err) {
      expect(err).not.toBe(undefined);
      expect(err.message).toBe('User with this ID does not exists!');
    }
  });

  // test('Should throw an error if user with specified ID does not exist', async () => {
  //   await expect(async () => await db.getAllUserTasks(-1).not.toThrow());
  // });
});
