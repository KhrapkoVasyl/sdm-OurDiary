'use strict';

const express = require('express');
const app = express();
const authRouter = require('./routers/authRouter');
const taskRouter = require('./routers/taskRouter');
const { PREFIX } = require('./config');

app.use(express.json());
app.use(PREFIX + '/auth', authRouter);
app.use(PREFIX + '/tasks', taskRouter);

module.exports = app;
