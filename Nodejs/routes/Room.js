const express = require('express');
const router = express.Router();
const roomController = require('../controller/room');
const jwt = require('jsonwebtoken');
const FileSystem = require('fs');

const public_key = FileSystem.readFileSync('./public.key', 'utf8');
const auth = (req, res, next) => {
    // const token = req.headers.token;
    const header = req.get('Authorization');
    console.log(header);
    const token = header.split(' ')[1];
    console.log(token,"this is token");
    if (!token) {
        return res.status(403).send({
            message: "No token provided!"
        });
    }
    jwt.verify(token, public_key, (err, decoded) => {
        if (err) {
            return res.status(401).send({
                message: "Unauthorized!"
            });
        }
        req.body.email = decoded.email;
        // req.body.password = decoded.password;
        req.body.valid = true;
        next();
    });
}


router.post('/create', roomController.create);
router.post('/join', roomController.join);
router.post('/getlist', roomController.getlist);
// router.post('/roomhandle', roomController.roomhandle);

exports.router = router;