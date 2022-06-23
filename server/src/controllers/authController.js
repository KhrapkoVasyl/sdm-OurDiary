'use strict';

const generateAccessToken = require('../utils/generateAccessToken');
const { validationResult } = require('express-validator');
const createUserService = require('../services/createUserService');

class AuthController {
  async registration(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ message: errors });
      }

      const { login, password } = req.body;

      const User = await createUserService(login, password);
      console.log(User);

      const accessToken = generateAccessToken(User.id);

      res.status(201).json({ message: 'User was created!', accessToken });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }

  async login(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ message: errors });
      }

      const { login, password } = req.body;

      const User = findUserByNameService(login, password);
      if (!User) {
        throw new Error('User with such name does not exists!');
      }

      const isPasswordValid = comparePasswordsService(login, password); // сервіс comparePasswords
      if (!isPasswordValid) {
        throw new Error('Incorrect password');
      }

      const accessToken = generateAccessToken(User.id);

      res.status(200).json({ message: 'Successfully logged in!', accessToken });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }
}

module.exports = new AuthController();
