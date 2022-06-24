/* eslint-disable max-len */
'use strict';

const User = require('./user');

describe('User Model Testing', () => {
  test('Should create a new user with given parameters', async () => {
    try {
      const user = new User({ id: 0, name: 'user', password: '123' });
      expect(user.id).toBe(0);
      expect(user.name).toBe('user');
      expect(user.password).toBe('123');
    } catch (err) {
      expect(err).toBe(undefined);
    }
  });

  test('Should throw an error when required parameter id is not specified', async () => {
    try {
      new User({ name: 'user', password: '123' });
    } catch (err) {
      expect(err.message).toBe('Field id must be specified');
    }
  });

  test('Should throw an error when required parameter name is not specified', async () => {
    try {
      new User({ id: 0, password: '123' });
    } catch (err) {
      expect(err.message).toBe('Field name must be specified');
    }
  });

  test('Should throw an error when required parameter password is not specified', async () => {
    try {
      new User({ id: 0, name: 'user' });
    } catch (err) {
      expect(err.message).toBe('Field password must be specified');
    }
  });
});
