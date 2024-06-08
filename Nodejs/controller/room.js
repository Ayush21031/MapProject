const mongoose = require('mongoose');
const Room = require('../model/room').roomSchema;
const User = require('../model/user').userSchema;
const {io} = require('../index');
async function generateroomid(){
    console.log("generating roomid")
    let roomid = Math.random().toString(36).substring(7);
    let flag = 1;
    while(flag){
        const room = await Room.findOne({ roomid: roomid });
        if(!room){
            flag = 0;
        }
        else{
            roomid = Math.random().toString(36).substring(7);
        }
    }
    console.log("roomid generated")
    return roomid;
}

exports.create = async (req, res) => {
    console.log(req.body);

    // Validate request
    if (!req.body.email) {
        return res.status(400).send({
            message: "Creator's email are required"
        });
    }

    // create a room id combination of numbers and alphabets
    const roomid_generated = await generateroomid();

    //check if roomid already exists

    const room = new Room({
        roomid: roomid_generated,
        people: [req.body.email] // Directly add email string
    });

    // Find the user by email and add the new room ID to their rooms array
    User.findOne({ email: req.body.email })
        .then((user) => {
            if (!user) {
                return res.status(404).send({
                    message: "User not found"
                });
            }

            // Add the new room ID to the user's rooms array
            user.rooms.push(req.body.roomid);

            // Save the updated user document
            user.save()
                .then(() => {
                    // After saving the user, save the new room
                    room.save()
                        .then((data) => {
                            res.send({roomid: data.roomid, message: "Room created"});
                        })
                        .catch((err) => {
                            res.status(500).send({
                                message: err.message || "Some error occurred while creating the room."
                            });
                        });
                })
                .catch((err) => {
                    res.status(500).send({
                        message: err.message || "Some error occurred while updating the user."
                    });
                });
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Some error occurred while searching for the user."
            });
        });
};



exports.join = (req, res) => {
    console.log(req.body);

    // Validate request
    if (!req.body.roomid || !req.body.email) {
        return res.status(400).send({
            message: "Room ID and email are required"
        });
    }

    Room.findOne({ roomid: req.body.roomid })
        .then((room) => {
            if (!room) {
                return res.status(404).send({
                    message: "Room not found"
                });
            }

            // Add the new email to the people array if not already present
            if (!room.people.includes(req.body.email)) {
                room.people.push(req.body.email);
            } else {
                return res.status(400).send({
                    message: "Email already exists in the room"
                });
            }

            // Find the user by email and add the room ID to their rooms array
            User.findOne({ email: req.body.email })
                .then((user) => {
                    if (!user) {
                        return res.status(404).send({
                            message: "User not found"
                        });
                    }

                    if (!user.rooms.includes(req.body.roomid)) {
                        user.rooms.push(req.body.roomid);
                    }
                    console.log(user.rooms);

                    user.save()
                        .then(() => {
                            room.save()
                                .then((updatedRoom) => {
                                    res.send({
                                        message: "Successfully joined the room",
                                        room: updatedRoom
                                    });
                                })
                                .catch((err) => {
                                    res.status(500).send({
                                        message: err.message || "Some error occurred while joining the room."
                                    });
                                });
                        })
                        .catch((err) => {
                            res.status(500).send({
                                message: err.message || "Some error occurred while updating the user."
                            });
                        });
                })
                .catch((err) => {
                    res.status(500).send({
                        message: err.message || "Some error occurred while searching for the user."
                    });
                });
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Some error occurred while searching for the room."
            });
        });
};


exports.getlist = (req,res) => {
    const email = req.body.email
    if(!email){
        return res.status(400).send({
            message: "Email is required"
        });
    }
    else{
        User.findOne({email: email})
        .then((user) => {
            if (!user) {
                return res.status(404).send({
                    message: "User not found"
                });
            }
            console.log(user.rooms);
            //send user.rooms as JSON response
            res.send({roomlist: user.rooms});
            // res.send(JSON.stringify(user.rooms));
            // res.send(user.rooms);
        })
    }
}

// exports.roomhandle = (req,res) => {
//     io.on('connection', (socket) => {
//         console.log(`${socket.id} connected successfully`);
//         // socket.emit('connect');
//         // socket.join(roomid);
//         // socket.to(roomid).emit('message', `Hello everyone! from ${socket.id}`);
//     });

//     socket.on('message', ({roomid, message}) => {
//         socket.to(roomid).emit('message', message);
//     });

//     socket.on('join-room', (roomid) => {
//         socket.join(roomid);
//         console.log(`${socket.id} joined room ${roomid}`);
//     });
// }