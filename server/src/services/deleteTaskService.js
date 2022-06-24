'use strict';

const db = require('../db/db');

const deleteTask = async (userID, taskID) => {
  const task = await db.findTask(taskID);
  if (!task) {
    throw new Error("Task with this ID does not exists!")
  }

  if (task.userID !== userID) {
    throw new Error("This task does not belongs to user or does not exists!")
  }

  const deletedtask = await db.deleteTask(taskID);
  if (!deletedtask) {
    throw new Error("Failed to delete task!")
  }

  return deletedtask;
};

module.exports = deleteTask;
