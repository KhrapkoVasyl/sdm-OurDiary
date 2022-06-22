'use strict';

require('dotenv').config();

const app = require('./app');

try {
  const EXPRESS_PORT = process.env.EXPRESS_PORT;
  app.listen(EXPRESS_PORT, () => {
    console.log(`Server listening on http://localhost:${EXPRESS_PORT}`);
  });
} catch (error) {
  throw error;
}
