const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('client-sessions');
const config = require('./config/auth');
const server = express();
const port = process.env.PORT || 4000;
const url = process.env.URL || 'http://localhost';

let corsOptions = {
    origin: `${url}:8080`
}

server.use(cors(corsOptions));
server.use(bodyParser.json());
server.use(session({
    cookieName: 'session',
    secret: config.secret,
    duration: 30 * 60 * 1000,
    activeDuration: 5 * 60 * 1000
}));
server.use(bodyParser.urlencoded({ extended: true }));

require('./models/db');
require('./routes/posts')(server);
require('./routes/users')(server);
require('./routes/authentication')(server);
require('./routes/fighters')(server);
require('./routes/events')(server);
require('./routes/files')(server);

// const path = require('path');
// server.use(express.static(path.join(__dirname, '/')));
server.use(express.static('public'));

server.get('/', (req, res) => {
    res.json({
        message: 'Test server up and running!'
    });
});

server.listen(port, () => {
    console.log(`Server running on port ${port}!`);
});

module.exports = server;


