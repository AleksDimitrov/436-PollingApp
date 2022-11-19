const express = require('express');
const app = express();
http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');
const leaveRoom = require('./utils/leave-room');

app.use(cors()); // cors middleware

const server = http.createServer(app);

// Create an io server and allow for CORS from http://localhost:3000 with GET and POST methods
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

const CHAT_BOT = 'ChatBot';
let chatRoom = ''; // E.g. javascript, node,...
let allUsers = []; // All users in current chat room
// Listen for when the client connects via socket.io-client

var holdAnswers = {}; // Dictionary of counter of votes on each box
var voters = [];
var boxes = 2;

function resetAnswers() {
    holdAnswers = {};
    // Started index at 1, because element id's start at at button1.
    for (let box = 1; box <= boxes; box++){
         holdAnswers["button" + box] = 0;
    }
}

// Takes in a dictionary and a list representing the keys with highest value.
// If there is a key with the highest value, an array of size 1 will be returned.
// We loop through dictionary, if value == highest, push key, if value > highest restart picking.
function getWinner(currAnswers) {
    let highest = 0;
    let winners = [];
    for (const [key, value] of Object.entries(currAnswers)) {
        if (value > highest) {
            winners = [];
            highest = value;
            winners.push(key);
        } else if (value == highest) {
            winners.push(key);
        }
    }
    return winners;
}

resetAnswers();

io.on('connection', (socket) => {
  console.log(`User connected ${socket.id}`);

  // Add a user to a room
  socket.on('join_room', (data) => {
    const { username, room } = data; // Data sent from client when join_room event emitted
    socket.join(room); // Join the user to a socket room

    let __createdtime__ = Date.now(); // Current timestamp
    // Send message to all users currently in the room, apart from the user that just joined
    socket.to(room).emit('receive_message', {
      message: `${username} has joined the chat room`,
      username: CHAT_BOT,
      __createdtime__,
    });
    socket.emit('receive_message', {
      message: `Welcome ${username}`,
      username: CHAT_BOT,
      __createdtime__,
    });
    chatRoom = room;
    allUsers.push({ id: socket.id, username, room });
    chatRoomUsers = allUsers.filter((user) => user.room === room);
    socket.to(room).emit('chatroom_users', chatRoomUsers);
    socket.emit('chatroom_users', chatRoomUsers);
  });
  socket.on('send_message', (data) => {
    const { message, username, room, __createdtime__ } = data;
    io.in(room).emit('receive_message', data); // Send to all users in room, including sender
  });
  socket.on('leave_room', (data) => {
    const { username, room } = data;
    socket.leave(room);
    const __createdtime__ = Date.now();
    // Remove user from memory
    allUsers = allUsers.filter((user) => user.id != socket.id); //leaveRoom(socket.id, allUsers);
    socket.to(room).emit('chatroom_users', allUsers);
    socket.to(room).emit('receive_message', {
      username: CHAT_BOT,
      message: `${username} has left the chat`,
      __createdtime__,
    });
    console.log(`${username} has left the chat`);
  });
  socket.on('disconnect', () => {
    console.log('User disconnected from the chat');
    const user = allUsers.find((user) => user.id == socket.id);
    if (user?.username) {
      allUsers = allUsers.filter((user) => user.id != socket.id); //leaveRoom(socket.id, allUsers);
      socket.to(chatRoom).emit('chatroom_users', allUsers);
      socket.to(chatRoom).emit('receive_message', {
        message: `${user.username} has disconnected from the chat.`,
      });
    }
  });
  console.log('a user connected');
  socket.on('button click', (msg) => {
      console.log(holdAnswers);
      if (!voters.includes(socket.id)) {
          voters.push(socket.id);
          holdAnswers[msg.id]++;
      }
  });


  setInterval(() => {
      if (counter < gameTime) {
          socket.emit('counter', counter);
      }  else {
          socket.emit('counter', "restarting in " + (roundTime-counter) + " ");
      }
      //Round ends 1 second after playtime.
      if (counter == gameTime+1) {
          //winningKey is a reduce function that determines key with highest value.
          // !TODO Winner determiner only supports two options.
          let winners = getWinner(holdAnswers);
          io.emit('button msg', { 'answers': holdAnswers, 'winner': winners});
      // Answers are cleared 2 seconds before gametime ends.
      } else if (counter == roundTime) {
          io.emit('reset msg', { 'answers': holdAnswers});
          resetAnswers();
          voters = [];
      }
  }, 500);
});

var gameTime = 10;
var roundTime = Math.floor(gameTime*1.5);
var counter = 0;
setInterval(() => {
    // (gameTime*1.5) indicates full round time. gameTime is playTime, 1.5* represents results time as well.
    if (counter < roundTime) { 
        counter++;
    } else {
        counter = 0;
    }
}, 1000);

server.listen(4000, () => 'Server is running on port 3000');