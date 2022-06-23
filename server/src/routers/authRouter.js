const Router = require('express');
const authRouter = new Router();
const authController = require('../controllers/authController');
const {
  registrValidationScheme,
  loginValidationScheme,
} = require('../middleware/authValidation');

authRouter
  .post('/signup', registrValidationScheme, authController.registration)
  .post('/signin', loginValidationScheme, authController.login);

module.exports = authRouter;
