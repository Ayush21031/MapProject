
const express = require('express');
const router = express.Router();
const userController = require('../controller/user');
const jwt = require('jsonwebtoken');
const FileSystem = require('fs');

const public_key = FileSystem.readFileSync('./public.key', 'utf8');

const auth = (req, res, next) => {
    const token = req.cookies.token;
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
        req.email = decoded.email;
        next();
    });
}

router.post('/login', userController.login);
router.post('/register', userController.register);
router.get('/userdetail', auth, userController.userdetail);
router.post('/logout', userController.logout);
router.post('/getmsg', userController.getmsg);
router.post('/getcontact', userController.getcontact);
router.post('/searchuser', userController.searchuser);
router.post('/addchat', userController.addchat);
router.post('/addmsg', userController.addMsg);

exports.router = router;

