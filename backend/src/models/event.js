const mongoose = require('mongoose');

let Schema = mongoose.Schema;

const Event = new Schema({
    event: {
        type: String
    },
    fighter1: {
        type: String
    },
    fighter2: { 
        type: String
    },
    date: { 
        type: Date
    },
    venue: { 
        type: String
    },
    category: { 
        type: String
    },
    imgTitle: {
        type: String,
        default: '' 
    }
});

mongoose.model('Event', Event);
