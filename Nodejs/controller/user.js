// const mongoose = require('mongoose');
// const usermodel = require('../model/user');
// const jwt = require('jsonwebtoken');
// const FileSystem = require('fs');
// const bcrypt = require('bcrypt');

// exports.register = (req, res) => {
//     console.log(req.body);
//     const user = new usermodel.userSchema({
//         firstName: req.body.firstName,
//         lastName: req.body.lastName,
//         email: req.body.email,
//         password: req.body.password,
//         rooms: []
//     });
//     // const token = jwt.sign({"email": req.body.email, "password": req.body.password}, "secretkey");
//     const private_key = FileSystem.readFileSync('./private.key', 'utf8');
//     const token = jwt.sign({"email": req.body.email}, private_key, { algorithm: 'RS256'});
//     const hash_password = bcrypt.hashSync(req.body.password, 10);
//     user.password = hash_password;

//     user.token = token;
//     user.save().then((data) => {
//         // res.send(data);
//         res.send({message: "Sign up Successfully", token: data.token});
//     }).catch((err) => {
//         res.status(500).send({
//             message: err.message || "Some error occurred while creating the user."
//         });
//     });
//     // console.log(req.body);
//     // res.send(req.body);
// };

// exports.login = (req, res) => {
//     usermodel.userSchema.findOne({
//         email: req.body.email,
//         // password: req.body.password
//     }).then((data) => {
//         if (!data) {
//             return res.status(404).send({
//                 message: "User not found with email " + req.body.email
//             });
//         }
//         // res.send(data);
//         const isAuth = bcrypt.compareSync(req.body.password, data.password);
//         if(isAuth){
//             // res.send("Logined successfully");
//             //send Logined Successfully in json format
//             res.send({message: "Logined Successfully", token: data.token, roomlist: data.rooms});
//         }
//         else{
//             res.send({message:"Password is incorrect"});
//         }
//     }).catch((err) => {
//         if (err.kind === 'ObjectId') {
//             return res.status(404).send({
//                 message: "User not found with email " + req.body.email
//             });
//         }
//         return res.status(500).send({
//             message: "Error retrieving user with email " + req.body.email
//         });
//     })};



// exports.userdetail = (req, res) => {
//     //return all users data
//     console.log(req.body);
//     usermodel.userSchema.find().then((data) => {
//         res.send(data);
//     }).catch((err) => {
//         res.status(500).send({
//             message: err.message || "Some error occurred while retrieving users."
//         });
//     })};


const mongoose = require('mongoose');
const usermodel = require('../model/user');
const jwt = require('jsonwebtoken');
const FileSystem = require('fs');
const bcrypt = require('bcrypt');

const private_key = FileSystem.readFileSync('./private.key', 'utf8');

const createToken = (email) => {
    return jwt.sign({ "email": email }, private_key, { algorithm: 'RS256', expiresIn: '1min' });
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

exports.userdetail = (req, res) => {
    usermodel.userSchema.findOne({ email: req.email }).then((data) => {
        res.send(data);
    }).catch((err) => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving users."
        });
    });
};
