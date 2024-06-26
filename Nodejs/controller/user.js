const mongoose = require('mongoose');
const usermodel = require('../model/user');
const chatmodel = require('../model/chat');
const msgmodel = require('../model/msg')
const jwt = require('jsonwebtoken');
const FileSystem = require('fs');
const bcrypt = require('bcrypt');

const private_key = FileSystem.readFileSync('./private.key', 'utf8');

const createToken = (email) => {
    return jwt.sign({ "email": email }, private_key, { algorithm: 'RS256', expiresIn: '7 days' });
}

exports.register = (req, res) => {
    const user = new usermodel.userSchema({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        rooms: []
    });

    const token = createToken(req.body.email);
    const hash_password = bcrypt.hashSync(req.body.password, 10);
    user.password = hash_password;
    user.token = token;

    user.save().then((data) => {
        res.cookie('token', token, { httpOnly: true }); // Removed maxAge
        res.send({ message: "Sign up Successfully", data: data });
    }).catch((err) => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the user."
        });
    });
};

exports.login = (req, res) => {
    usermodel.userSchema.findOne({ email: req.body.email }).then((data) => {
        if (!data) {
            return res.status(404).send({
                message: "User not found with email " + req.body.email
            });
        }
        const isAuth = bcrypt.compareSync(req.body.password, data.password);
        if (isAuth) {
            const token = createToken(req.body.email);
            data.token = token;
            data.save();

            res.cookie('token', token, { httpOnly: true }); // Removed maxAge
            res.send({ message: "Logined Successfully", roomlist: data.rooms, data: data });
        } else {
            res.send({ message: "Password is incorrect" });
        }
    }).catch((err) => {
        return res.status(500).send({
            message: "Error retrieving user with email " + req.body.email
        });
    });
};

exports.logout = (req, res) => {

    console.log("Logout Successfully");
    res.clearCookie('token');
    res.send({ message: "Logout Successfully" });
};


exports.searchuser = (req, res) =>{
    const email = req.body.email;
    // list of all users in the database starts with email in user model
    usermodel.userSchema.find({ email: { $regex: email, $options: 'i' } }).select(['email','firstName','lastName']).then((data) => {
        res.send({"list":data});
    }).catch((err) => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving users."
        });
    });
}


exports.addchat = (req, res) =>{
    const participant1 = req.body.participant1;
    const participant2 = req.body.participant2;
    // console.log(participant1, participant2);
    // res.send({"message":"Chat created successfully"});
    const chat_id = participant1+participant2;
    const chat = new chatmodel.chatSchema({
        chat_id: chat_id,
        participants: [participant1, participant2],
    })
    // res.send({"message":"Chat created successfully"});
    chat.save().then((data)=>{
        res.send({"message":"Chat created successfully"});
    })
    .catch((err) => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating chat."
        });
    });
}

exports.userdetail = (req, res) => {

    // console.log(req.email, "email requests logout");

    usermodel.userSchema.findOne({ email: req.email }).then((data) => {
        res.send(data);
    }).catch((err) => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving users."
        });
    });
};
exports.addMsg = (req,res) =>{
    const chat_id = req.body.chat_id;
    const sender = req.body.sender;
    const msg = req.body.msg;
    const date_time = req.body.date_time;
    const msgdata = new msgmodel.msgSchema({
        chat_id: chat_id,
        sender: sender,
        msg: msg,
        date_time: date_time
    })
    const maamu = {
        message: "Acknowledge Me"
    }
    msgdata.save().then((data) => {
        res.send(maamu);
    }).catch((err) => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating message."
        });
    });
}
exports.getmsg = (req,res) =>{
    const chat_id = req.body.chat_id
    const msgs = []
    msgmodel.msgSchema.find({chat_id: chat_id}).then((data) => {
        res.send(data);
    }).catch({
        message: "Some error occurred while retrieving messages."
    })
    
}

exports.getcontact = (req,res) => {
    //console.log(req.body);
    const senderEmail = req.body.sender
    chatmodel.chatSchema.find({participants: senderEmail}).then((data) => {
        res.send(data);
    })
}
