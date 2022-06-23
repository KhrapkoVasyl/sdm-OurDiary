'use strict';

const Model = require('./model');

class User extends Model {
  #requiredParams = ['id', 'name', 'password'];

  constructor({ id, name, password }) {
    super();
    this.id = id;
    this.name = name;
    this.password = password;

    this.checkRequiredParams(this.#requiredParams);
  }
}

module.exports = User;
