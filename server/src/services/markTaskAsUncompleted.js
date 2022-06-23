'use strict';

const db = require('../db/db');

const markTaskAsUncompleted = async (userID, taskID) => {
  const task = await db.findTask(taskID);
  if (!task) {
    throw new Error("Task with this ID does not exists!")
  }

  if (task.userID !== userID) {
    throw new Error("This task does not belongs to user or does not exists!")
  }

  const updatedTask = await db.updateTask(taskID, { isDone: false });
  if (!updatedTask) {
    throw new Error("Failed to mark task as uncompleted!")
  }

  return updatedTask;
};

module.exports = markTaskAsUncompleted;
