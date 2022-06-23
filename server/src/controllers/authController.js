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
}

module.exports = new AuthController();
