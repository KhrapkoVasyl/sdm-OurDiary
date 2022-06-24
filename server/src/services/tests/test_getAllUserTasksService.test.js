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
  let task5;

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

    const taskData5 = {
      title: 'task5',
      isDone: true,
    };
    user = await db.insertUser(userData); //preparing user to use for userID in task
    task1 = await db.insertTask({ ...taskData1, userID: user.id });
    task2 = await db.insertTask({ ...taskData2, userID: user.id });
    task3 = await db.insertTask({ ...taskData3, userID: user.id });
    task4 = await db.insertTask({ ...taskData4, userID: user.id });
    task5 = await db.insertTask({ ...taskData5, userID: user.id });
  });

  afterEach(async () => {
    await db.clearDB();
    await fs
      .rm(dirPath, { recursive: true, force: true })
      .catch(err => console.log(err));
  });

  test('Should throw an error if userID is not specified', async () => {
    try {
      await getAllUserTasks();
    } catch (err) {
      expect(err).not.toBe(undefined);
      expect(err.message).toBe('User with this ID does not exists!');
    }
  });

  test('Should throw an error if user with specified ID does not exist', async () => {
    try {
      await getAllUserTasks(-1);
    } catch (err) {
      expect(err).not.toBe(undefined);
      expect(err.message).toBe('User with this ID does not exists!');
    }
  });

  test('Should return all user tasks for the specified userID', async () => {
    const allTasks = await getAllUserTasks(user.id);
    expect(Array.isArray(allTasks)).toBe(true);
    expect(allTasks.length).toBe(5);
    expect(allTasks.includes(task1)).toBe(true);
    expect(allTasks.includes(task2)).toBe(true);
    expect(allTasks.includes(task3)).toBe(true);
    expect(allTasks.includes(task4)).toBe(true);
    expect(allTasks.includes(task5)).toBe(true);
  });

  test('Should return all user tasks for which the field isDone equal to true', async () => {
    const allTasks = await getAllUserTasks(user.id, true);

    expect(Array.isArray(allTasks)).toBe(true);
    expect(allTasks.length).toBe(3);
    expect(allTasks.includes(task1)).not.toBe(true);
    expect(allTasks.includes(task2)).toBe(true);
    expect(allTasks.includes(task3)).not.toBe(true);
    expect(allTasks.includes(task4)).toBe(true);
    expect(allTasks.includes(task5)).toBe(true);
    for (const task of allTasks) {
      expect(task.isDone).toBe(true);
    }
  });

  test('Should return all user tasks for which the field isDone equal to false', async () => {
    const allTasks = await getAllUserTasks(user.id, false);

    expect(Array.isArray(allTasks)).toBe(true);
    expect(allTasks.length).toBe(2);
    expect(allTasks.includes(task1)).toBe(true);
    expect(allTasks.includes(task2)).not.toBe(true);
    expect(allTasks.includes(task3)).toBe(true);
    expect(allTasks.includes(task4)).not.toBe(true);
    expect(allTasks.includes(task5)).not.toBe(true);
    for (const task of allTasks) {
      expect(task.isDone).toBe(false);
    }
  });

  test('When overdue is set to true, should return all records whose deadline isn`t equal to undefined and whose deadline is less (earlier) than or equal to the current time', async () => {
    const allTasks = await getAllUserTasks(user.id, undefined, true);

    const currentTime = new Date().toISOString();
    expect(Array.isArray(allTasks)).toBe(true);
    expect(allTasks.length).toBe(2);
    expect(allTasks.includes(task1)).toBe(true);
    expect(allTasks.includes(task2)).toBe(true);
    expect(allTasks.includes(task3)).not.toBe(true);
    expect(allTasks.includes(task4)).not.toBe(true);
    expect(allTasks.includes(task5)).not.toBe(true);
    for (const task of allTasks) {
      expect(task.deadline <= currentTime).toBe(true);
    }
  });

  test('When overdue is set to false, should return all records whose deadline isn`t equal to undefined and whose deadline is greater (later) than the current', async () => {
    const allTasks = await getAllUserTasks(user.id, undefined, false);

    const currentTime = new Date().toISOString();
    expect(Array.isArray(allTasks)).toBe(true);
    expect(allTasks.length).toBe(2);
    expect(allTasks.includes(task1)).not.toBe(true);
    expect(allTasks.includes(task2)).not.toBe(true);
    expect(allTasks.includes(task3)).toBe(true);
    expect(allTasks.includes(task4)).toBe(true);
    expect(allTasks.includes(task5)).not.toBe(true);
    for (const task of allTasks) {
      expect(task.deadline > currentTime).toBe(true);
    }
  });
});
