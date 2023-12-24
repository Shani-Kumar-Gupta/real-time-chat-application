const express = require('express');
const { PORT_NUMBER } = require('./config/env.config');
const helmet = require('helmet');
const { morganMiddleware } = require('./middlewares');
const { logger } = require('./utils');
const { APP_ERROR } = require('./constants');

/* Initialized app with express */
const app = express();

const PORTNUMBER = PORT_NUMBER;

/* Middlewares */
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morganMiddleware);

/* Created and listen Server on PORT */
app
  .listen(PORTNUMBER, (error) => {
    if (!error) logger.info(APP_ERROR.MSG_SERVER_LISTING + PORTNUMBER);
  })
  .on('error', (error) => {
    logger.error(APP_ERROR.ERR_SERVER_START + error);
  });
