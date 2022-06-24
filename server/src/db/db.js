'use strict';

require('dotenv').config();
const path = require('path');
const FileBasedDB = require('./fileBasedDB');

const { DB_FOLDER, DB_TEST_FOLDER, DB_TEST_MODE } = process.env;
const FOLDER = DB_TEST_MODE === '1' ? DB_TEST_FOLDER : DB_FOLDER;
const DATA_DIRECTORY = path.join(__dirname, FOLDER);
const db = new FileBasedDB(DATA_DIRECTORY);

module.exports = db;
