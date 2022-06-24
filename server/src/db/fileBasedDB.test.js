/* eslint-disable max-len */
'use strict';

const path = require('path');
const fs = require('fs').promises;
const FileBasedDB = require('./fileBasedDB');

describe('File Based Database Testing', () => {
  const dirPath = path.join('./src/db/testDB');
  const fileUsersPath = path.join(dirPath, 'users.json');
  const fileTasksPath = path.join(dirPath, 'tasks.json');
  const db = new FileBasedDB(dirPath);

  beforeEach(async () => {
    await db.connect();
  });

  afterEach(async () => {
    await db.clearDB();
    await fs
      .rm('./src/db/testDB', { recursive: true, force: true })
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
      const insertedUser = await db.insertUser({
        name: 'testName',
        password: '123',
      });

      const user = await db.findUserById(insertedUser.id);

      expect(user.id).toBe(insertedUser.id);
      expect(user.name).toBe('testName');
      expect(user.password).toBe('123');
    });

    test('Should return undefined when the user with the specified id does not exist', async () => {
      const user = await db.findUserById(-1);

      expect(user).toBe(undefined);
    });
  });

  describe('Testing the .findUserByName() method', () => {
    test('Should return a user with a name that is equal to the specified name for when specifying the name of an existing user', async () => {
      const insertedUser = await db.insertUser({
        name: 'testName',
        password: '123',
      });

      const user = await db.findUserByName('testName');

      expect(user.id).toBe(insertedUser.id);
      expect(user.name).toBe('testName');
      expect(user.password).toBe('123');
    });

    test('Should return undefined when the user with the specified name does not exist', async () => {
      const user = await db.findUserByName(
        'user with this name does not exist'
      );

      expect(user).toBe(undefined);
    });
  });

  describe('Testing the .findTask() method', () => {
    test('Should return a task with an ID that is equal to the specified ID for when specifying the ID of an existing task', async () => {
      const user = await db.insertUser({ name: 'test', password: '123' }); //preparing user to use for userID in task
      const taskToInsert = {
        userID: user.id,
        title: 'task',
        isDone: false,
      };
      const insertedTask = await db.insertTask(taskToInsert);

      const task = await db.findTask(insertedTask.id);

      expect(task.id).toBe(insertedTask.id);
      expect(task.userID).toBe(user.id);
      expect(task.title).toBe('task');
      expect(task.isDone).toBe(false);
    });

    test('Should return undefined when the task with the specified id does not exist', async () => {
      const task = await db.findTask(-1);

      expect(task).toBe(undefined);
    });
  });

  describe('Testing the .findAllTasks() method', () => {
    test('Should return all tasks of user with the specified id', async () => {
      const user = await db.insertUser({ name: 'testUser', password: '123' });
      const task1 = await db.insertTask({
        title: 'task1',
        userID: user.id,
        isDone: true,
      });
      const task2 = await db.insertTask({
        title: 'task2',
        userID: user.id,
        isDone: false,
      });
      const task3 = await db.insertTask({
        title: 'task3',
        userID: user.id,
        isDone: false,
      });

      const tasksArr = await db.findAllTasks({ userID: user.id });

      expect(tasksArr.length).toBe(3);
      expect(tasksArr[0]).toEqual(task1);
      expect(tasksArr[1]).toEqual(task2);
      expect(tasksArr[2]).toEqual(task3);
    });

    test('Should return an empty array when the id of a non-existent user is specified', async () => {
      const tasksArr = await db.findAllTasks({ userID: -1 });

      expect(tasksArr).toEqual([]);
    });

    test('Should return all tasks of user with the specified id which have the field isDone equal to false', async () => {
      const user = await db.insertUser({ name: 'testUser', password: '123' });
      const task1 = await db.insertTask({
        title: 'task1',
        userID: user.id,
        isDone: true,
      });
      const task2 = await db.insertTask({
        title: 'task2',
        userID: user.id,
        isDone: false,
      });
      const task3 = await db.insertTask({
        title: 'task3',
        userID: user.id,
        isDone: false,
      });

      const tasksArr = await db.findAllTasks({
        userID: user.id,
        isDone: false,
      });

      expect(tasksArr.length).toBe(2);
      expect(tasksArr[0]).toEqual(task2);
      expect(tasksArr[1]).toEqual(task3);
      for (const task of tasksArr) {
        expect(task.isDone).toBe(false);
      }
    });
  });

  describe('Testing the .updateTask() method', () => {
    test('Should change the properties of the task to the specified', async () => {
      const user = await db.insertUser({ name: 'test', password: '123' }); //preparing user to use for userID in task
      const taskToInsert = {
        userID: user.id,
        title: 'task',
        isDone: false,
      };
      const task = await db.insertTask(taskToInsert);

      const updatedTask = await db.updateTask(task.id, {
        title: 'updatedTask',
        isDone: true,
      });

      expect(updatedTask.id).toBe(task.id);
      expect(updatedTask.userID).toBe(user.id);
      expect(updatedTask.title).toBe('updatedTask');
      expect(updatedTask.isDone).toBe(true);
    });

    test('Should not change the task id when it is set as a parameter to update', async () => {
      const user = await db.insertUser({ name: 'test', password: '123' }); //preparing user to use for userID in task
      const taskToInsert = {
        userID: user.id,
        title: 'task',
        isDone: false,
      };
      const task = await db.insertTask(taskToInsert);

      const updatedTask = await db.updateTask(task.id, {
        id: -1,
      });

      expect(updatedTask.id).toBe(task.id);
      expect(updatedTask.id).not.toBe(-1);
      expect(updatedTask).toEqual(task);
    });

    test('Should not change the task userID when it is set as a parameter to update', async () => {
      const user = await db.insertUser({ name: 'test', password: '123' }); //preparing user to use for userID in task
      const taskToInsert = {
        userID: user.id,
        title: 'task',
        isDone: false,
      };
      const task = await db.insertTask(taskToInsert);

      const updatedTask = await db.updateTask(task.id, {
        userID: -1,
      });

      expect(updatedTask.userID).toBe(task.userID);
      expect(updatedTask.userID).toBe(user.id);
      expect(updatedTask.userID).not.toBe(-1);
      expect(updatedTask).toEqual(task);
    });

    test('Should not throw an error when trying to update a non-existing job', async () => {
      expect(async () => await db.updateTask(-1)).not.toThrow();
    });
  });

  describe('Testing the .deleteTask() method', () => {
    test('Should delete the existing task with the specified id, returned task should be equal to task which we deleted, the number of user tasks should be equal to zero', async () => {
      const user = await db.insertUser({ name: 'test', password: '123' }); //preparing user to use for userID in task
      const taskToInsert = {
        userID: user.id,
        title: 'task',
        isDone: false,
      };
      const task = await db.insertTask(taskToInsert);

      const deletedTask = await db.deleteTask(task.id);
      const allUserTasks = await db.findAllTasks(user.id);

      expect(deletedTask).toEqual(task);
      expect(allUserTasks.length).toBe(0);
      expect(allUserTasks.includes(deletedTask)).toBe(false);
    });

    test('Should not throw an error if an invalid id is specified', async () => {
      expect(async () => await db.deleteTask(-1)).not.toThrow();
    });
  });
});
