'use strict';

const FileBasedDB = require('./fileBasedDB');

const db = new FileBasedDB(process.env.DB_PATH);

module.exports = db;
