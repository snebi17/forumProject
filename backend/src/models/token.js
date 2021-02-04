const mongoose = require('mongoose');

let Schema = mongoose.Schema;

const Token = new Schema({
    token: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

mongoose.model('Token', Token);