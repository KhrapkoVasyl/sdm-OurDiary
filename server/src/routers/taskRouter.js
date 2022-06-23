'use strict';

const Router = require('express');
const { getAllUserTasks, getAllCompletedTasks, getAllOverdueTasks, getAllUncompletedTasks } = require('../controllers/taskController');
const taskRouter = new Router();
const taskController = require('../controllers/taskController');
const authMiddleware = require("../middleware/authMiddleware");

taskRouter
  .post('/create', authMiddleware, taskController.createTask)
  .patch('/update', authMiddleware, taskController.updateTask)
  .patch('/markcompleted', authMiddleware, taskController.markTaskAsCompleted)
  .patch('/markuncompleted', authMiddleware, taskController.markTaskAsUncompleted)
  .delete('/delete', authMiddleware, taskController.deleteTask)
  .get('/getall', authMiddleware, getAllUserTasks)
  .get('/getcompleted', authMiddleware, getAllCompletedTasks)
  .get('/getuncompleted', authMiddleware, getAllUncompletedTasks)
  .get('/getoverdue', authMiddleware, getAllOverdueTasks);

module.exports = taskRouter;
