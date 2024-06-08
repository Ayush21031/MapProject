// const mongoose = require('mongoose');

// const roomSchema = new mongoose.Schema({
//     roomid: { type: String, required: true, unique: true },
//     people: [
//         {
//             email: { type: String, required: true }
//         }
//     ]
// });

// exports.roomSchema = mongoose.model('Room', roomSchema);



const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
    roomid: { type: String, required: true, unique: true },
    people: [{ type: String, required: true }] // Array of email strings
});

exports.roomSchema = mongoose.model('Room', roomSchema);
