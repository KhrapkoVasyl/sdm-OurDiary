'use strict';

const db = require('../db/db');

const getAllUserTasks = async (userID) => {
  const user = db.findUserById(userID);
  if (!user) {
    throw new Error("User with this ID does not exists!")
  }

  const tasks = await db.findAllTasks({ userID });
  if (tasks.length > 1) {
    tasks.sort((a, b) => a['deadline'] > b['deadline'] ? 1 : -1);
  }

  return tasks;
};

module.exports = getAllUserTasks;
