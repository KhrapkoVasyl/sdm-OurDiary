'use strict';

const Model = require('./model');

class Task extends Model {
  #requiredParams = ['id', 'userID', 'title', 'isDone'];

  constructor({ id, userID, title, description, isDone, completionDate }) {
    super();
    this.id = id;
    this.userID = userID;
    this.title = title;
    this.description = description || '';
    this.isDone = isDone;
    this.completionDate = completionDate || null;

    this.checkRequiredParams(this.#requiredParams);
  }
}

module.exports = Task;
