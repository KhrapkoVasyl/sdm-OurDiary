'use strict';

const Router = require('express');
const { getAllUserTasks } = require('../controllers/taskController');
const taskRouter = new Router();
const taskController = require('../controllers/taskController');
const authMiddleware = require('../middleware/authMiddleware');

taskRouter
  .get('/', authMiddleware, getAllUserTasks)
  .post('/', authMiddleware, taskController.createTask)

  .delete('/:id', authMiddleware, taskController.deleteTask)

  .patch('/:id', authMiddleware, taskController.updateTask)
  .patch('/toggle/:id', authMiddleware, taskController.toggleTask);

module.exports = taskRouter;
