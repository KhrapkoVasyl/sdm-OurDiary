'use strict';

const db = require('../db/db');

const updateTask = async (userID, taskID, dataToUpdate) => {
  const task = await db.findTask(taskID);
  if (!task) {
    throw new Error("Task with this ID does not exists!")
  }

  if (task.userID !== userID) {
    throw new Error("This task does not belongs to user or does not exists!")
  }

  const updatedTask = await db.updateTask(taskID, dataToUpdate);
  if (!updatedTask) {
    throw new Error("Failed to update task!")
  }

  return updatedTask;
};

module.exports = updateTask;
