const express = require('express');
const { PORT_NUMBER } = require('./config/env.config');
const helmet = require('helmet');
const { morganMiddleware } = require('./middlewares');
const { logger } = require('./utils');
const { APP_ERROR } = require('./constants');
const http = require('http');
const path = require('path');
const socketio = require('socket.io');
const { socketHelper } = require('./helper');

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
io.on('connection', (socket) => {
  socket.on('joinRoom', ({ username, room }) => {
    /*
    1. Create a new user with id, username and room in db.
    2. Socket should have some track how all users are joined
    3. Airtribe default message going to send only to the newly joined user.
    4. Broadcast all the existing users: has someone joined the room excluding the user itself.
    */
    // Step 1:
    const user = socketHelper.newUser(socket.id, username, room);
    logger.info(`Server has created a new user ${user}`);

    // Step 2:
    socket.join(user.room);

    // Step 3:
    socket.emit(
      'message',
      socketHelper.formatMessage(
        'Chit Chat',
        'Messages are limited to this room only!'
      )
    );

    // Step 4:
    socket.broadcast
      .to(user.room)
      .emit(
        'message',
        socketHelper.formatMessage(
          'Chit Chat',
          `${user.username} has joined the room`
        )
      );
  });
});

/* Created and listen Server on PORT */
server
  .listen(PORTNUMBER, (error) => {
    if (!error) logger.info(APP_ERROR.MSG_SERVER_LISTING + PORTNUMBER);
  })
  .on('error', (error) => {
    logger.error(APP_ERROR.ERR_SERVER_START + error);
  });
