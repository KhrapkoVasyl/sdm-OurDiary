'use strict';

const db = require('../db/db');

const getAllOverdueTasks = async (userID) => {
  const user = db.findUserById(userID);
  if (!user) {
    throw new Error("User with this ID does not exists!")
  }

  const uncompletedTasks = await db.findAllTasks({ userID, isDone: false });
  if (uncompletedTasks.length === 0) {
    return [];
  } else if (uncompletedTasks.length > 1) {
    uncompletedTasks.sort((a, b) => a['deadline'] > b['deadline'] ? 1 : -1);
  }

  const overdueTasks = [];
  const currentTime = new Date();
  
  uncompletedTasks.forEach((task) => {
    if (task.deadline < currentTime) overdueTasks.push(task);
  });

  return overdueTasks;
};

module.exports = getAllOverdueTasks;
