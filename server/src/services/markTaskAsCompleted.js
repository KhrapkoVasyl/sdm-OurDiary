'use strict';

const db = require('../db/db');

const markTaskAsCompleted = async (userID, taskID) => {
  const task = await db.findTask(taskID);
  if (!task) {
    throw new Error("Task with this ID does not exists!")
  }

  if (task.userID !== userID) {
    console.log(task.userID, userID)
    throw new Error("This task does not belongs to user or does not exists!")
  }

  const updatedTask = await db.updateTask(taskID, { isDone: true });
  if (!updatedTask) {
    throw new Error("Failed to mark task as completed!")
  }

  return updatedTask;
};

module.exports = markTaskAsCompleted;
