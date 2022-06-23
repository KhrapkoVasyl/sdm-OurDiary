'use strict';

const __process__ = require('process');

const setSignalProcessing = (sigArr, callback) => {
  for (const sig of sigArr) {
    __process__.on(sig, callback);
  }
};

module.exports = setSignalProcessing;
