'use strict';

const express = require('express');
const app = express();
const authRouter = require('./routers/authRouter');
const { PREFIX } = require("./config")

app.use(express.json());
app.use(PREFIX + '/auth', authRouter);

module.exports = app;
