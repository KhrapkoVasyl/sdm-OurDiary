'use strict';

const Router = require('express');
const taskRouter = new Router();
const taskController = require('../controllers/taskController');
const authMiddleware = require("../middleware/authMiddleware");

taskRouter
  .post('/create', authMiddleware, taskController.createTask)
  .patch('/update', authMiddleware, taskController.updateTask)
  .patch('/markcompleted', authMiddleware, taskController.markTaskAsCompleted)
  .patch('/markuncompleted', authMiddleware, taskController.markTaskAsUncompleted)
  .delete('/delete', authMiddleware, taskController.deleteTask);

module.exports = taskRouter;
