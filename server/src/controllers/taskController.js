'use strict';

const createTask = require('../services/createTask');
const updateTask = require('../services/updateTask');
const deleteTask = require('../services/deleteTask');
const markTaskAsCompleted = require('../services/markTaskAsCompleted');
const markTaskAsUncompleted = require('../services/markTaskAsUncompleted');

class TaskController {
  async createTask(req, res) {
    try {
      const userID = req.userID;

      const task = await createTask({userID, ...req.body });

      res.status(201).json({ 
        status: 'success', 
        message: 'Task was created!', 
      });
    } catch (err) {
      res.status(400).json({ 
        status: 'failed', 
        message: err.message 
      });
    }
  }
}

module.exports = new TaskController();
