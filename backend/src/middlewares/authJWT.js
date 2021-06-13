const JWT = require('jsonwebtoken');
const config = require('../config/auth');
const mongoose = require('mongoose');

const User = mongoose.model('User');
const Token = mongoose.model('Token');

verifyTokenWhitelist = (req, res, next) => {
    Token.findOne({ 'token': req.body.headers.Authorization.split(' ')[1]})
        .then(token => {
            if (!token) {
                return res.status(401).send({
                    message: 'Nedovoljen dostop!'
                });
            }
            next();
        })
        .catch(err => {
            res.status(500).send({
                message: 'Prišlo je do napake'
            });
        });
};

verifyTokenUser = (req, res, next) => {
    let token = req.headers.authorization.split(' ')[1];
    if (!token) {
        return res.status(403).send({
            message: 'No token provided'
        });
    }

    JWT.verify(token, config.secret, (err, decoded) => {
        if (err) {
            return res.status(401).send({
                message: 'Nedovoljen dostop!'
            });
        }
        if (req.params.id === decoded.id || req.params.uid === decoded.id) {
            next();
        }
        else {
            return res.status(401).send({
                message: 'Nedovoljen dostop!'
            });
        }
    })
};

verifyUserCall = (req, res, next) => {

};

const authJwt = {
    verifyTokenWhitelist: verifyTokenWhitelist,
    verifyTokenUser: verifyTokenUser,
    verifyUserCall: verifyUserCall
}

module.exports = authJwt;