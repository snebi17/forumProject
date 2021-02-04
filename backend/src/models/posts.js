const mongoose = require('mongoose');
let crypto = require('crypto');
let jwt = require('jsonwebtoken');
// let config = require('../config/auth');

let Schema = mongoose.Schema;

const Post = new Schema({
    title: {
        type: String,
        maxlength: 64,
        required: true
    },
    body: {
        type: String,
        maxlength: 255,
        required: true
    },
    commentsSection: {

    }
});

Post.methods.addComment = body => {
    // Post.commentsSection += body;
}

mongoose.model('Post', Post);