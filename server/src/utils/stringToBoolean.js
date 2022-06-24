'use strict';

const { FALSE_STR, TRUE_STR } = require('../config');

const stringToBoolean = str => {
  if (str === TRUE_STR) return true;
  if (str === FALSE_STR) return false;
};

module.exports = stringToBoolean;
