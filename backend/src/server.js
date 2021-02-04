const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const server = express();
const port = process.env.PORT || 4000;
const url = process.env.URL || 'http://localhost';

let corsOptions = {
    origin: `${url}:8080`
}

server.use(cors(corsOptions));
server.use(bodyParser.json());

server.use(bodyParser.urlencoded({ extended: true }));

require('./models/db');
require('./routes/posts')(server);
require('./routes/users')(server);

const path = require('path');
server.use(express.static(path.join(__dirname, '/dist')));

server.use(passport.initialize());

server.get('/', (req, res) => {
    res.json({message: 'Test server up and running!' });
});

server.listen(port, () => {
    console.log(`Server running on port ${port}!`);
});

module.exports = server;