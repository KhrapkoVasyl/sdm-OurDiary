/* eslint-disable max-len */
'use strict';

const Task = require('./task');

describe('Task Model Testing', () => {
  test('Should create a task with given parameters', async () => {
    try {
      const task = new Task({ id: 0, userID: 1, title: 'task', isDone: true });
      expect(task.id).toBe(0);
      expect(task.userID).toBe(1);
      expect(task.title).toBe('task');
      expect(task.isDone).toBe(true);
    } catch (err) {
      expect(err).toBe(undefined);
    }
  });

  test('Should throw an error when required parameter id is not specified', async () => {
    try {
      new Task({ userID: 1, title: 'task', isDone: true });
    } catch (err) {
      expect(err.message).toBe('Field id must be specified');
    }
  });

  test('Should throw an error when required parameter userID is not specified', async () => {
    try {
      new Task({ id: 0, title: 'task', isDone: true });
    } catch (err) {
      expect(err.message).toBe('Field userID must be specified');
    }
  });

  test('Should throw an error when required parameter title is not specified', async () => {
    try {
      new Task({ id: 0, userID: 1, isDone: true });
    } catch (err) {
      expect(err.message).toBe('Field title must be specified');
    }
  });

  test('Should throw an error when required parameter isDone is not specified', async () => {
    try {
      new Task({ id: 0, userID: 1, title: 'task' });
    } catch (err) {
      expect(err.message).toBe('Field isDone must be specified');
    }
  });
});
