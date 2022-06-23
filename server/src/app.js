'use strict';

const express = require('express');
const app = express();
const authRouter = require('./routers/authRouter');

app.use(express.json());
app.use('/auth', authRouter);
app.use('/', (req, res) => {
  res.send('Hello from server!');
});

module.exports = app;
