'use strict';

class Task {
  id;
  userId;
  title;
  description;
  isDone;
  completionDate;

  constructor({ id, uid, title, description, isDone, completionDate }) {
    this.id = id;
    this.userID = uid;
    this.title = title;
    this.description = description;
    this.isDone = isDone;
    this.completionDate = completionDate;
  }
}

module.exports = Task;
