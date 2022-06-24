'use strict';

const db = require('../db/db');

const createTask = async (task) => {
  const newTask = await db.insertTask(task);
  if (!newTask) {
    throw new Error("Failed to create task!")
  }

  return newTask;
};

module.exports = createTask;
