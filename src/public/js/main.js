const chatForm = document.getElementById('chat-form');
const chatMessages = document.querySelector('.chat-messages');
const roomName = document.getElementById('room-name');
const userList = document.getElementById('users');

const searchParams = new URLSearchParams(window.location.search);
const username = searchParams.get('username');
const room = searchParams.get('room');
// const { username, room } = Qs.parse(location.search, {
//   ignoreQueryPrefix: true,
// });

/* Creating and Initiating the connect to socket.io */
const socket = io();

/* Initiate connection and emit message to socket io that you want to join a room */
socket.emit('joinRoom', { username, room });

socket.on('message', (message) => {
  outputMessage(message);
});

socket.on('roomUsers', (user) => {
  outputRoomName(user.room);
  outputUsers(user.users);
});

function outputMessage(message) {
  const div = document.createElement('div');
  div.classList.add('message');

  const p = document.createElement('p');
  p.classList.add('meta');
  p.innerText = message.username;
  p.innerHTML += `<span>${message.time}</span>`;
  div.appendChild(p);

  const para = document.createElement('p');
  para.classList.add('text');
  para.innerText = message.text;
  div.appendChild(para);

  chatMessages.appendChild(div);
}

function outputRoomName(room) {
  roomName.innerText = room;
}

function outputUsers(users) {
  userList.innerHTML = '';
  users.forEach((user) => {
    const li = document.createElement('li');
    li.innerText = user.username;
    userList.appendChild(li);
  });
}

chatForm.addEventListener('submit', (e) => {
  e.preventDefault();
  let msg = e.target.elements.msg.value;
  msg = msg.trim();
  if (!msg) return false;
  // Emit message to server
  socket.emit('chatMessage', {
    username,
    room,
    msg
  });

  e.target.elements.msg.value = '';
  e.target.elements.msg.focus();
});

//Prompt the user before leave chat room
document.getElementById('leave-btn').addEventListener('click', () => {
  const leaveRoom = confirm('Are you sure you want to leave the chatroom?');
  if (leaveRoom) {
    window.location = '../index.html';
  } else {
  }
});
