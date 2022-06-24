'use strict';

const Router = require('express');
const { getAllUserTasks, getAllCompletedTasks, getAllOverdueTasks, getAllUncompletedTasks } = require('../controllers/taskController');
const taskRouter = new Router();
const taskController = require('../controllers/taskController');
const authMiddleware = require("../middleware/authMiddleware");

taskRouter
  .post('/', authMiddleware, taskController.createTask)

  .delete('/', authMiddleware, taskController.deleteTask)

  .patch('/update', authMiddleware, taskController.updateTask)
  .patch('/toggle', authMiddleware, taskController.toggleTask)
  
  .get('/getall', authMiddleware, getAllUserTasks)
  .get('/getcompleted', authMiddleware, getAllCompletedTasks)
  .get('/getuncompleted', authMiddleware, getAllUncompletedTasks)
  .get('/getoverdue', authMiddleware, getAllOverdueTasks);

module.exports = taskRouter;
