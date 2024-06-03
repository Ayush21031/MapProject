const express = require('express');
const user_routes = require('./routes/User');
const mongoose = require('mongoose');
const server = express();
const cors = require('cors');
// const jwt = require('jsonwebtoken');


// Connect to MongoDB

main().catch(err => console.log(err));

async function main(){
    await mongoose.connect('mongodb://localhost:27017/MapConnect');
    console.log('connected to db')
}


server.use(cors());
server.use(express.json());
server.get('/', (req, res) => {
    res.send('Hello World');
    });

server.use('/user', user_routes.router);

server.listen(3000, () => {
    console.log('Server is running...');
    });