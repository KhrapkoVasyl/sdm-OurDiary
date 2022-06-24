'use strict';

const createTaskService = require('../services/createTaskService');
const updateTaskService = require('../services/updateTaskService');
const deleteTaskService = require('../services/deleteTaskService');
const getAllCompletedTasksService = require('../services/getAllCompletedTasksService');
const getAllUncompletedTasksService = require('../services/getAllUncompletedTasksService');
const getAllUserTasksService = require('../services/getAllUserTasksService');
const getAllOverdueTasksService = require('../services/getAllOverdueTasksService');
const toggleTaskService = require("../services/toggleTaskService");

class TaskController {
  async createTask(req, res) {
    try {
      const userID = req.userID;

      const task = await createTaskService({userID, ...req.body });

      res.status(201).json({ 
        status: 'success', 
        data: task 
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

      const task = await updateTaskService(userID, taskID, req.body);

      res.status(200).json({ 
        status: 'success', 
        data: task
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

      const deletedTask = await deleteTaskService(userID, taskID);

      res.status(200).json({ 
        status: 'success', 
        data: deletedTask
      });
    } catch (err) {
      res.status(400).json({ 
        status: 'failed', 
        message: err.message  
      });
    }
  }

  async getAllCompletedTasks(req, res) {
    try {
      const userID = req.userID;

      const tasks = await getAllCompletedTasksService(userID);

      res.status(201).json({ 
        status: 'success', 
        data: tasks
      });
    } catch (err) {
      res.status(400).json({ 
        status: 'failed', 
        message: err.message 
      });
    }
  }

  async getAllOverdueTasks(req, res) {
    try {
      const userID = req.userID;

      const tasks = await getAllOverdueTasksService(userID);

      res.status(201).json({ 
        status: 'success', 
        data: tasks
      });
    } catch (err) {
      res.status(400).json({ 
        status: 'failed', 
        message: err.message 
      });
    }
  }

  async getAllUserTasks(req, res) {
    try {
      const userID = req.userID;

      const tasks = await getAllUserTasksService(userID);

      res.status(201).json({ 
        status: 'success', 
        data: tasks
      });
    } catch (err) {
      res.status(400).json({ 
        status: 'failed', 
        message: err.message 
      });
    }
  }

  async getAllUncompletedTasks(req, res) {
    try {
      const userID = req.userID;

      const tasks = await getAllUncompletedTasksService(userID);

      res.status(201).json({ 
        status: 'success', 
        data: tasks
      });
    } catch (err) {
      res.status(400).json({ 
        status: 'failed', 
        message: err.message 
      });
    }
  }

  async toggleTask(req, res) {
    try {
      const userID = req.userID;
      const taskID = req.body.id;

      const updatedTask = await toggleTaskService(userID, taskID); 
      res.status(200).json({ 
        status: 'success', 
        data: updatedTask
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
