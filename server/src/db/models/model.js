'use strict';

class Model {
  checkRequiredParams(requiredParams) {
    for (const param of requiredParams) {
      if (this[param] === undefined || this[param] === null) {
        throw new Error(`Field ${param} must be specified`);
      }
    }
  }
}

module.exports = Model;
