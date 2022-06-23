'use strict';

const path = require('path');

class FileBasedDB {
  #tasksFilename = 'tasks.json';
  #usersFilename = 'users.json';
  #dataDirectory;
  #pathToTasksFile;
  #pathToUsersFile;

  #tasks = [];
  #users = [];

  constructor(dataDirectory = path.join(__dirname, 'fileDB')) {
    this.#dataDirectory = dataDirectory;

    this.#pathToTasksFile = path.join(this.#dataDirectory, this.#tasksFilename);

    this.#pathToUsersFile = path.join(this.#dataDirectory, this.#usersFilename);
  }
}

module.exports = FileBasedDB;
