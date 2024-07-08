const http = require('http');
const express = require('express');
const { Server } = require('socket.io');
const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: '*',
    }
});

io.on('connection', (socket) => {
    console.log(`user ${socket.id} is connected`);

    socket.on('offer', (data) => {
        socket.broadcast.emit('offer', data);
    });

    socket.on('answer', (data) => {
        socket.broadcast.emit('answer', data);
    });

    socket.on('message', data => {
        console.log("sended by user : ",data)
        socket.broadcast.emit('message:recived', data);
    });

    socket.on('candidate', (data) => {
        socket.broadcast.emit('candidate', data);
    });

    socket.on('disconnect', () => {  
        console.log(`user ${socket.id} has left`);
    });

    socket.on('image', (data) => {
        console.log('Image received:');
        socket.broadcast.emit('image:received', data);
    });

    socket.on('audio', (data) => {
        console.log('Audio received');
        socket.broadcast.emit('audio:received', data);
    });
});

server.listen(5000, () => {
    console.log('Chat server is running on port 5000');
});
