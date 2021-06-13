const mongoose = require('mongoose');
let crypto = require('crypto');
let jwt = require('jsonwebtoken');
// let config = require('../config/auth');

let Schema = mongoose.Schema;

// const Comment = {
//     body: {
//         type: String,
//         maxlength: 255,
//         required: true
//     },
//     author: {
//         type: String,
//         _id: String
//     },
//     createdAt: {
//         type: Date,
//         default: Date.now()
//     },
// }

const Post = new Schema({
    title: {
        type: String,
        maxlength: 64,
        // required: true
    },
    body: {
        type: String,
        // required: true
    },
    author: {
        type: String,
        // required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    imgTitle: {
        type: String,
        default: ''
    },
    comments: [
        {
            body: {
                type: String,
                maxlength: 255,
                required: true
            },
            author: {
                type: String,
                _id: String
            },
            createdAt: {
                type: Date,
                default: Date.now()
            },
        }
    ]
});

mongoose.model('Post', Post);