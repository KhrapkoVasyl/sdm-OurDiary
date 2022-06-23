'use strict';

const Router = require('express');
const authRouter = new Router();
const authController = require('../controllers/authController');
const {
  registrValidationScheme,
  loginValidationScheme,
} = require('../middleware/authValidation');

authRouter
  .post('/signup', registrValidationScheme, authController.signUp)
  .post('/signin', loginValidationScheme, authController.signIn);

module.exports = authRouter;
