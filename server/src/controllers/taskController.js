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

  async updateTask(req, res) {
    try {
      const userID = req.userID;
      const taskID = req.body.id;

      delete req.body.id;

      const task = await updateTask(userID, taskID, req.body);

      res.status(200).json({ 
        status: 'success', 
        message: 'Task was updated!', 
      });
    } catch (err) {
      res.status(400).json({ 
        status: 'failed', 
        message: err.message 
      });
    }
  }

  async deleteTask(req, res) {
    try {
      const userID = req.userID;
      const taskID = req.body.id;

      const dletedTask = await deleteTask(userID, taskID);

      res.status(200).json({ 
        status: 'success', 
        message: 'Task was deleted!', 
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
