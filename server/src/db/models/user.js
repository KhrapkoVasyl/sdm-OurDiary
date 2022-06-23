'use strict';

class User {
  id;
  name;
  password;

  constructor({ id, name, password }) {
    this.id = id;
    this.name = name;
    this.password = password;
  }
}

module.exports = User;
