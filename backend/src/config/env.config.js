require('dotenv').config();

const { PORT_NUMBER, NODE_ENV } = process.env;

module.exports = {
  PORT_NUMBER,
  NODE_ENV
};