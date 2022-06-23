/* eslint-disable max-len */
'use strict';

const path = require('path');
const fs = require('fs').promises;
const FileBasedDB = require('./fileBasedDB');

describe('File Based Database Testing', () => {
  const dirPath = path.join(__dirname, 'testDB');
  const db = new FileBasedDB(dirPath);

  beforeEach(async () => {
    await db.connect();
  });

  afterEach(async () => {
    await fs
      .rm(dirPath, { recursive: true, force: true })
      .catch(err => console.log(err));
  });

  describe('Testing the .connect() method', () => {
    //the .connect() method creates
    // a directory at the specified path (and database files in this directory).
    // We don't call it directly in the test
    //because this method is called before every test.

    test('Should create directory ./test and not throw an error when trying to access this folder', async () => {
      const testFolderAccess = async () => await fs.access(dirPath);

      expect(testFolderAccess).not.toThrow();
    });

    test('Should create datafile ./test/tasks.json and not throw an error when trying to access this datafile', async () => {
      const pathToFile = path.join(dirPath, 'tasks.json');

      const testFileAccess = async () => await fs.access(pathToFile);

      expect(testFileAccess).not.toThrow();
    });

    test('Should create datafile ./test/users.json and not throw an error when trying to access this datafile', async () => {
      const pathToFile = path.join(dirPath, 'users.json');

      const testFileAccess = async () => await fs.access(pathToFile);
      expect(testFileAccess).not.toThrow();
    });
  });
});
