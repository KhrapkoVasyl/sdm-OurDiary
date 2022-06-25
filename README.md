<p align="center">
    <a href="https://github.com/KhrapkoVasyl/sdm-OurDiary/issues">
        <img alt="GitHub issues" src="https://img.shields.io/github/issues/KhrapkoVasyl/sdm-OurDiary?style=for-the-badge"></a>
    <a href="https://github.com/KhrapkoVasyl/sdm-OurDiary/network">
        <img alt="GitHub forks" src="https://img.shields.io/github/forks/KhrapkoVasyl/sdm-OurDiary?style=for-the-badge">
    </a>
    <a href="https://github.com/KhrapkoVasyl/sdm-OurDiary/stargazers">
        <img alt="GitHub stars" src="https://img.shields.io/github/stars/KhrapkoVasyl/sdm-OurDiary?style=for-the-badge">
    </a>
    <a href="https://github.com/KhrapkoVasyl/sdm-OurDiary/blob/main/LICENSE">
        <img alt="GitHub license" src="https://img.shields.io/github/license/KhrapkoVasyl/sdm-OurDiary?style=for-the-badge">
    </a>
    <a href="https://github.com/KhrapkoVasyl/sdm-OurDiary/graphs/contributors">
        <img alt="GitHub license" src="https://img.shields.io/github/contributors/KhrapkoVasyl/sdm-OurDiary.svg?style=for-the-badge">
    </a>

</p>

# OurDiary 📚

> Full-Stack Web Application For Tracking Tasks

## Main features:

- [x] Create your own account with password and login
- [x] Add a task (specify title, description and deadline)
- [x] Delete task
- [x] Edit task (title, description, deadline)
- [x] Mark task as done
- [x] Filter tasks (done, undone, overdue)

## Preview

![image](https://user-images.githubusercontent.com/71723893/175769531-ad5adfcf-e4b1-450e-81a7-a703410d27b2.png)

## Installation

1. Clone the repo:
   ```sh
   git clone https://github.com/KhrapkoVasyl/sdm-OurDiary.git
   ```
2. Install NPM packages and start the client:
   ```sh
   cd client
   npm install
   npm start
   ```
3. Install NPM packages for server:

   ```sh
   cd ../server
   npm install
   ```

   Create the configuration file `.env` as shown in the [example](https://github.com/KhrapkoVasyl/sdm-OurDiary/blob/main/server/.env.example).

   And start the server:

   ```sh
   npm start
   ```

4. Open http://localhost:3000 to view the app in your browser.

5. Run the tests:
   ```sh
   cd [client|server]
   npm test
   ```

## Built with

- Back-end: [Node.js](https://nodejs.org/), [Express.js](https://expressjs.com/), [Crypto.js](https://www.npmjs.com/package/crypto-js), [express-validator](https://express-validator.github.io/docs/), [JWT](https://jwt.io/), [JEST](https://jestjs.io/)

- Front-end: [React.js](https://reactjs.org/), [Redux (Redux Toolkit)](https://redux-toolkit.js.org/), [React Hook Form](https://react-hook-form.com/), [Styled Components](https://styled-components.com/), [React Router](https://reactrouter.com/), [AXIOS](https://github.com/axios/axios)

## Design document

To see the document - click [here ✨](https://drive.google.com/drive/folders/1WgySgi1yGNpBTCcI9G5rF5acOLb8cnC7?usp=sharing)

## 👨‍💻 Contributors

- Vasyl Khrapko (Database and Back-end developer) - [@vazzz7zzzok](https://t.me/vazzz7zzzok) - khrapko2002@gmail.com
- Artem Matiushenko (Front-end developer) - [@artemko_m](https://t.me/artemko_m) - artom.matyushenko@gmail.com
- Bogdan Zinovij (Back-end developer)- [@bzinovoy](https://t.me/bzinovoy) - bogdanolexandrov@gmail.com
