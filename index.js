const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
app.use(express.static(__dirname+'/static'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    console.log("socket.id: " + socket.id);
    socket.broadcast.emit('chat message', 'To all connected clients except the sender');

    socket.on('chat message', (msg) => {
        console.log('message: ' + msg);
        io.emit('chat message', msg);

    });

    socket.on('tiltAngle', function(msg) {
        console.log('tiltAngle: ' + msg);
        io.emit('tiltAngle', msg)
    });

    socket.on('skidJoy', function(msg) {
        console.log('skidJoy: ' + msg);
        io.emit('skidJoy', msg)
    });

    socket.on('stopMovement', function(msg) {
        console.log('stopMovement: ' + msg);
        io.emit('stopMovement', msg)
    });

    socket.on('goToLocation', function(msg) {
        console.log('goToLocation: ' + msg);
        io.emit('goToLocation', msg)
    });

    socket.on('followMe', function(msg) {
        console.log('followMe: ' + msg);
        io.emit('followMe', msg)
    });
});

server.listen(8000, () => {
  console.log('listening on *:8000');
});