const express = require('express');
const { PORT_NUMBER } = require('./config/env.config');
const helmet = require('helmet');
const { morganMiddleware } = require('./middlewares');
const { logger } = require('./utils');
const { APP_ERROR } = require('./constants');
const http = require('http');
const path = require('path');
const socketio = require('socket.io');

/* Initialized app with express */
const app = express();
const server = http.createServer(app);

const PORTNUMBER = PORT_NUMBER;

/* Middlewares */
app.use(helmet());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morganMiddleware);

/* Socket IO */
const io = socketio(server);

/* Hand Shake Request: 
?socker.on() => used to receive an event
?socket.emit() => used to emit the event
*/
io.on('connection', socket => {
  socket.on('joinRoom', ({ username, room }) => {});
});

/* Created and listen Server on PORT */
server
  .listen(PORTNUMBER, (error) => {
    if (!error) logger.info(APP_ERROR.MSG_SERVER_LISTING + PORTNUMBER);
  })
  .on('error', (error) => {
    logger.error(APP_ERROR.ERR_SERVER_START + error);
  });
