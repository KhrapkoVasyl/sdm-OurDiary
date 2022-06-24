'use strict';

const db = require('../db/db');

const toggleTask = async (userID, taskID) => {
  const task = await db.findTask(taskID);
  if (!task) {
    throw new Error("Task with this ID does not exists!")
  }

  if (task.userID !== userID) {
    console.log(task.userID, userID)
    throw new Error("This task does not belongs to user or does not exists!")
  }
  const isDone = task.isDone === true ? false : true;

  const completionDate = task.isDone === true ? new Date().toISOString() : undefined;

  const updatedTask = await db.updateTask(taskID, { isDone, completionDate });
  if (!updatedTask) {
    throw new Error("Failed to toggle Task!")
  }

  return updatedTask;
};

module.exports = toggleTask;
