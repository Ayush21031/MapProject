// const express = require('express');
// const user_routes = require('./routes/User');
// const room_routes = require('./routes/Room');
// const mongoose = require('mongoose');
// const {Server} = require('socket.io');
// const {createServer} = require('http');
// const app = express();
// const cors = require('cors');
// const server = createServer(app);

// const io = new Server(server, {
//     cors: {
//         origin: '*',
//         methods: ['GET', 'POST'],
//         credentials: true
//     }
// });

// // const jwt = require('jsonwebtoken');


// // Connect to MongoDB

// main().catch(err => console.log(err));

// async function main(){
//     await mongoose.connect('mongodb://localhost:27017/MapConnect');
//     console.log('connected to db')
// }


// app.use(cors());
// app.use(express.json());
// app.get('/', (req, res) => {
//     res.send('Hello World');
//     });

// app.use('/user', user_routes.router);
// app.use('/room', room_routes.router);


// io.on('connection', (socket) => {
//     console.log(`${socket.id} connected successfully`);
//     socket.on('join-room', (roomid) => {
//         socket.join(roomid);
//         socket.to(roomid).emit('message', `Hello everyone! from ${socket.id}`);
//         console.log(`${socket.id} joined room ${roomid}`);
//     });

//     socket.on('message', ({roomid, message}) => {
//         socket.to(roomid).emit('message', message);
//     });
// });






// server.listen(3000, () => {
//     console.log('Server is running...');
//     });

// exports.io = io;




const express = require('express');
const user_routes = require('./routes/User');
const room_routes = require('./routes/Room');
const mongoose = require('mongoose');
const {Server} = require('socket.io');
const {createServer} = require('http');
const cookieParser = require('cookie-parser');
const app = express();
const cors = require('cors');
const server = createServer(app);

const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST'],
        credentials: true
    }
});

main().catch(err => console.log(err));

async function main(){
    // await mongoose.connect('mongodb://localhost:27017/MapConnect');
    await mongoose.connect('mongodb+srv://ayush21031:ayushsachan02@cluster0.vdxug01.mongodb.net/MapConnect');
    console.log('connected to db')
}

app.use(cors({
    origin: 'http://localhost:3001', // Update with your frontend's URL
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.use('/user', user_routes.router);
app.use('/room', room_routes.router);

io.on('connection', (socket) => {
    console.log(`${socket.id} connected successfully`);
    socket.on('join-room', (roomid) => {
        socket.join(roomid);
        socket.to(roomid).emit('message', `Hello everyone! from ${socket.id}`);
        console.log(`${socket.id} joined room ${roomid}`);
    });

    socket.on('message', ({roomid, message}) => {
        socket.to(roomid).emit('message', message);
    });
});

server.listen(3000, () => {
    console.log('Server is running...');
});

exports.io = io;
