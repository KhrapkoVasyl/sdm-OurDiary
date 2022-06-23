'use strict';

const generateAccessToken = require('../utils/generateAccessToken');

class AuthController {
  async registration(req, res) {
    try {
      const { login, password } = req.body;

      const UserWithSameName = findUserByName(login); // сервіс findUserByName
      if (UserWithSameName) {
        throw new Error('User with the same name is already exists!');
      }

      const User = createUserService(login, password);
      if (!User) {
        throw new Error("User wasn't created!");
      }

      const accessToken = generateAccessToken(User.id);

      res.status(201).json({ message: 'User was created!', accessToken });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }

  async login(req, res) {
    try {
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
