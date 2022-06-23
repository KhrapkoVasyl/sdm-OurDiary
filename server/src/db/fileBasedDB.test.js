/* eslint-disable max-len */
'use strict';

const path = require('path');
const fs = require('fs').promises;
const FileBasedDB = require('./fileBasedDB');

describe('File Based Database Testing', () => {
  const dirPath = path.join(__dirname, 'testDB');
  const fileUsersPath = path.join(dirPath, 'users.json');
  const fileTasksPath = path.join(dirPath, 'tasks.json');
  const db = new FileBasedDB(dirPath);

  beforeEach(async () => {
    await db.connect();
  });

  afterEach(async () => {
    await db.clearDB();
    await fs
      .rm(dirPath, { recursive: true, force: true })
      .catch(err => console.log(err));
  });

  describe('Testing the .connect() method', () => {
    //the .connect() method creates
    // a directory at the specified path (and database files in this directory).
    // We don't call it directly in the test
    //because this method is called before every test.

    test('Should create directory ./test and not throw an error when trying to access this folder', async () => {
      const testFolderAccess = async () => await fs.access(dirPath);

      expect(testFolderAccess).not.toThrow();
    });

    test('Should create datafile ./test/tasks.json and not throw an error when trying to access this datafile', async () => {
      const testFileAccess = async () => await fs.access(fileTasksPath);

      expect(testFileAccess).not.toThrow();
    });

    test('Should create datafile ./test/users.json and not throw an error when trying to access this datafile', async () => {
      const testFileAccess = async () => await fs.access(fileUsersPath);
      expect(testFileAccess).not.toThrow();
    });
  });

  describe('Testing the .insertUser() method', () => {
    test('Should create and return a new user and add it to user.json file (the user saved to the file and the user returned must be equal) and id should be added automatically', async () => {
      const user = {
        name: 'Leo',
        password: '123',
      };
      const returnedUser = await db.insertUser(user);

      const dataInUsersFile = await fs.readFile(fileUsersPath);
      const usersArr = JSON.parse(dataInUsersFile);
      const userInDB = usersArr[0];

      expect(returnedUser).toEqual(userInDB);
      expect(returnedUser).toHaveProperty('id');
      expect(returnedUser.name).toBe('Leo');
      expect(returnedUser.password).toBe('123');
    });
  });

  describe('Testing the .insertTask() method', () => {
    test('Should throw an error when we try to create a task with a user id that does not exist', async () => {
      const task = {
        userID: 1,
        title: 'task1',
        isDone: false,
      };

      await expect(
        async () =>
          await db
            .insertTask(task)
            .toThrow('Trying to assign a task to an inexisting user')
      );
    });

    test('Should create and return a new task and add it to task.json file (the task saved to the file and the task returned must be equal) and id should be added automatically', async () => {
      const user = await db.insertUser({ name: 'test', password: '123' }); //preparing user to use for userID in task
      const task = {
        userID: user.id,
        title: 'task',
        isDone: false,
      };
      const returnedTask = await db.insertTask(task);

      const dataInUsersFile = await fs.readFile(fileTasksPath);
      const taskArr = JSON.parse(dataInUsersFile);
      const taskInDB = taskArr[0];

      expect(returnedTask).toEqual(taskInDB);
      expect(returnedTask).toHaveProperty('id');
      expect(returnedTask.userID).toBe(user.id);
      expect(returnedTask.title).toBe('task');
      expect(returnedTask.isDone).toBe(false);
    });
  });

  describe('Testing the .findUserById() method', () => {
    test('Should return a user with an ID that is equal to the specified ID for when specifying the ID of an existing user', async () => {
      await db.insertUser({ name: 'testName', password: '123' });

      const user = await db.findUserById(0);

      expect(user.id).toBe(0);
      expect(user.name).toBe('testName');
      expect(user.password).toBe('123');
    });
  });
});
