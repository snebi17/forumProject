const mongoose = require('mongoose');
const dbURI = 'mongodb://localhost:27017/forum';
require('./posts');
require('./users');
require('./token');

mongoose.connect(dbURI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: true
});

mongoose.connection.on('connected', () => {
    console.log(`Mongoose connected to ${dbURI}.`);
});

mongoose.connection.on('error', error => {
    console.log('Mongoose connection error: ', error);
});

mongoose.connection.on('disconnected', () => {
    console.log('Mongoose not connected.');
});

