'use strict';

const generateAccessToken = require('../utils/generateAccessToken');
const { validationResult } = require('express-validator');
const createUserService = require('../services/createUserService');
const comparePasswordsService = require("../services/comparePasswordsService");
const findUserByNameService = require("../services/findUserByNameService")

class AuthController {
  async signUp(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ 
          status: 'failed', 
          message: errors 
        });
      }

      const { login, password } = req.body;

      const user = await createUserService(login, password);

      const accessToken = generateAccessToken(user.id);

      res.status(201).json({ 
        status: 'success', 
        message: 'User was created!', 
        accessToken 
      });
    } catch (err) {
      res.status(400).json({ 
        status: 'failed', 
        message: err.message 
      });
    }
  }

  async signIn(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ 
          status: 'failed', 
          message: errors 
        });
      }

      const { login, password } = req.body;

      const user = await findUserByNameService(login);

      const isPasswordValid = await comparePasswordsService(login, password);
      if (!isPasswordValid) {
        throw new Error('Incorrect password!');
      }

      const accessToken = generateAccessToken(user.id);

      res.status(200).json({ 
        status: 'success', 
        message: 'Successfully logged in!', 
        accessToken 
      });
    } catch (err) {
      res.status(400).json({ 
        status: 'failed', 
        message: err.message 
      });
    }
  }
}

module.exports = new AuthController();
