'use strict';

const db = require('../db/db');

const getAllCompletedTasks = async (userID) => {
  const user = db.findUserById(userID);
  if (!user) {
    throw new Error("User with this ID does not exists!")
  }

  const completedTasks = await db.findAllTasks({ userID, isDone: true });
  if (completedTasks.length > 1) {
    completedTasks.sort((a, b) => a['deadline'] > b['deadline'] ? 1 : -1);
  }

  return completedTasks;
};

module.exports = getAllCompletedTasks;
