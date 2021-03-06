'use strict';

const fs = require('fs').promises;
const path = require('path');
const { ERRNO_NO_SUCH_FILE, ERR_CODE_NO_SUCH_FILE } = require('../config');
const { Task, User } = require('./models/main');

class FileBasedDB {
  #tasksFilename = 'tasks.json';
  #usersFilename = 'users.json';
  #dataDirectory;
  #pathToTasksFile;
  #pathToUsersFile;
  #EMPTY_ARR_JSON_SIZE = 4;

  #currentUserID = 0;
  #currentTaskID = 0;

  #tasks = [];
  #users = [];

  constructor(dataDirectory = path.join(__dirname, 'fileDB')) {
    this.#dataDirectory = dataDirectory;

    this.#pathToTasksFile = path.join(this.#dataDirectory, this.#tasksFilename);

    this.#pathToUsersFile = path.join(this.#dataDirectory, this.#usersFilename);
  }

  async connect() {
    await fs.mkdir(path.join(this.#dataDirectory), {
      recursive: true,
    }); // recursively creates non-existent directories in the given path

    await this.#createFileIfNotExist(this.#pathToTasksFile, this.#tasks);
    await this.#createFileIfNotExist(this.#pathToUsersFile, this.#users);

    let tasksStr = await fs.readFile(this.#pathToTasksFile);
    let usersStr = await fs.readFile(this.#pathToUsersFile);

    tasksStr = this.#checkEmptyStringJSON(tasksStr);
    usersStr = this.#checkEmptyStringJSON(usersStr);

    this.#tasks = JSON.parse(tasksStr);
    this.#users = JSON.parse(usersStr);

    this.#currentTaskID = this.#findCurrentID(this.#tasks);
    this.#currentUserID = this.#findCurrentID(this.#users);
  }

  #checkEmptyStringJSON(strJSON) {
    return strJSON < this.#EMPTY_ARR_JSON_SIZE ? '[]' : strJSON;
  }

  #findCurrentID(modelsArr) {
    if (!modelsArr.length) return 0;
    const idArr = modelsArr.map(el => el.id);
    const lastID = Math.max.apply(null, idArr);
    return lastID + 1;
  }

  async #createFileIfNotExist(path, fileData = '') {
    await fs.access(path).catch(async err => {
      if (
        err.code === ERR_CODE_NO_SUCH_FILE &&
        err.errno === ERRNO_NO_SUCH_FILE
      ) {
        await this.#saveFile(path, fileData);
      } else throw err;
    });
  }

  async #saveFile(path, fileData) {
    await fs.writeFile(path, JSON.stringify(fileData));
  }

  async #syncDB() {
    await this.#saveFile(this.#pathToTasksFile, this.#tasks);
    await this.#saveFile(this.#pathToUsersFile, this.#users);
  }

  async clearDB() {
    this.#tasks = [];
    this.#users = [];
    this.#currentTaskID = 0;
    this.#currentUserID = 0;
    await this.#syncDB();
  }

  async findUserById(uid) {
    return this.#users.find(user => user.id === uid);
  }

  async findUserByName(name) {
    return this.#users.find(user => user.name === name);
  }

  async findTask(tid) {
    return this.#tasks.find(task => task.id === tid);
  }

  async findAllTasks(filterParams = {}) {
    const paramsArr = Object.keys(filterParams);
    let tasks = this.#tasks;
    for (const param of paramsArr) {
      tasks = tasks.filter(task => task[param] === filterParams[param]);
    }
    return tasks;
  }

  async insertTask(task) {
    const user = await this.findUserById(task.userID);
    if (!user) throw new Error('Trying to assign a task to an inexisting user');
    const taskID = this.#currentTaskID++;
    const newTask = new Task({ id: taskID, ...task });
    this.#tasks.push(newTask);
    await this.#saveFile(this.#pathToTasksFile, this.#tasks);
    return newTask;
  }

  async insertUser(user) {
    const userID = this.#currentUserID++;
    const newUser = new User({ id: userID, ...user });
    this.#users.push(newUser);
    await this.#saveFile(this.#pathToUsersFile, this.#users);
    return newUser;
  }

  async updateTask(tid, dataToUpdate = {}) {
    const taskToUpdate = await this.findTask(tid);
    // eslint-disable-next-line no-prototype-builtins
    if (dataToUpdate.hasOwnProperty('id')) delete dataToUpdate.id;
    // eslint-disable-next-line no-prototype-builtins
    if (dataToUpdate.hasOwnProperty('userID')) delete dataToUpdate.userID;
    const propertiesToUpdate = Object.keys(dataToUpdate);
    for (const property of propertiesToUpdate) {
      taskToUpdate[property] = dataToUpdate[property];
    }

    const updatedTaskIndex = this.#tasks.findIndex(task => task.id === tid);
    this.#tasks.splice(updatedTaskIndex, 1, taskToUpdate);
    await this.#saveFile(this.#pathToTasksFile, this.#tasks);
    return taskToUpdate;
  }

  async deleteTask(tid) {
    const taskToDeleteIndex = this.#tasks.findIndex(task => task.id === tid);
    if (taskToDeleteIndex === -1) return;
    const [deletedTask] = this.#tasks.splice(taskToDeleteIndex, 1);
    await this.#saveFile(this.#pathToTasksFile, this.#tasks);
    return deletedTask;
  }
}

module.exports = FileBasedDB;
