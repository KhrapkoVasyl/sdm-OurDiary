'use strict';

const { body } = require('express-validator');

const registrValidationScheme = [
  body('login', 'Nickmane must be between 3 and 16 characters long')
    .notEmpty()
    .bail()
    .isLength({ min: 3, max: 16 }),
  body('password', 'Password must be between 8 and 16 characters long')
    .notEmpty()
    .bail()
    .isLength({ min: 8, max: 16 }),
];

const loginValidationScheme = [
  body('login').notEmpty().withMessage('Nickname can not be empty'),
  body('password').notEmpty().withMessage('Password can not be empty'),
];

module.exports = { registrValidationScheme, loginValidationScheme };
