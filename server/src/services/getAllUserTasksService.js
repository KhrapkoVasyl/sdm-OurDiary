'use strict';

const db = require('../db/db');

const getAllUserTasks = async (userID, isDone, overdue) => {
  const user = db.findUserById(userID);
  if (!user) {
    throw new Error('User with this ID does not exists!');
  }
  const findOptions = isDone === undefined ? { userID } : { userID, isDone };

  let tasks = await db.findAllTasks(findOptions);

  const currentDate = new Date().toISOString();
  if (overdue === true)
    tasks = tasks.filter(task => {
      if (!task.deadline) return false;
      return task.deadline <= currentDate;
    });

  if (overdue === false)
    tasks = tasks.filter(task => {
      if (!task.deadline) return false;
      return task.deadline > currentDate;
    });

  if (tasks.length > 1) {
    tasks.sort((a, b) => (a['deadline'] > b['deadline'] ? 1 : -1));
  }

  return tasks;
};

module.exports = getAllUserTasks;
