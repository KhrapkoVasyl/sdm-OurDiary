/* eslint-disable max-len */
'use strict';

const stringToBoolean = require('./stringToBoolean');

describe('StringToBoolean Function Testing', () => {
  test('Should return false if the string "false" is given', async () => {
    expect(stringToBoolean('false')).toBe(false);
  });

  test('Should return ture if the string "true" is given', async () => {
    expect(stringToBoolean('true')).toBe(true);
  });

  test('Should return undefined if the string is not specified', async () => {
    expect(stringToBoolean()).toBe(undefined);
  });

  test('Should return undefined if a given string did not equal "true" or "false"', async () => {
    expect(stringToBoolean('string')).toBe(undefined);
  });

  test('Should return undefined if a given string is an empty string', async () => {
    expect(stringToBoolean('')).toBe(undefined);
  });
});
