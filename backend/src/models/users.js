const mongoose = require('mongoose');
let crypto = require('crypto');
let jwt = require('jsonwebtoken');
// let config = require('../config/auth');

let Schema = mongoose.Schema;

const secret = 'nejc-strubenhauser-project';

const User = new Schema({
    username: {
        type: String,
        maxlength: 32,
        required: true,
        unique: true
    },
    email: {
        type: String,
        maxlength: 64,
        required: true,
        unique: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    salt: {
        type: String,
        required: true
    },
    hashedPassword: {
        type: String,
        required: true
    }
});

User.methods.hashPassword = function(password) {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hashedPassword = crypto
        .pbkdf2Sync(password, this.salt, 1000, 64,'sha512')
        .toString('hex');
};

User.methods.checkPassword = function(password) {
    let hashedPassword = crypto
        .pbkdf2Sync(password, this.salt, 1000, 64,'sha512')
        .toString('hex');
    return this.hashedPassword === hashedPassword;
};

User.methods.generateJWT = function() {
    return jwt.sign({ id: this._id }, secret, {
        expiresIn: '24h'
    });
};

mongoose.model('User', User);
