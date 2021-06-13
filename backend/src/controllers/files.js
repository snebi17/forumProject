const uploadFile = require('../middlewares/upload');
const mongoose = require('mongoose');

const path = require('path');
const fs = require('fs');
const sharp = require('sharp');
var appDir = path.dirname(require.main.filename);

exports.upload = async (req, res) => {
    try {
        await uploadFile(req, res);

        if (req.file === undefined) 
            return res.status(400).send({ message: 'Please upload a file' });

        res.status(200).send({
            message: `Uploaded the file successfully ${req.body.title}`
        });
    }
    catch (err) {
        if (err.code == 'LIMIT_FILE_SIZE') {
            return res.status(500).send({
                message: 'File size cannot be larger than 2MB'
            });
        }
        res.status(500).send({
            message: `Could not upload the file: ${req.body.title}. ${err}`
        });
    }
};

exports.download = (req, res) => {
    const User = mongoose.model('User');
    const Event = mongoose.model('Event');
    const Post = mongoose.model('Post');

    switch (req.query.type) {
        case 'users': {
            User.findById(req.query.id)
                .then(user => {
                    res.send({ imgTitle: `${user.imgTitle}` });
                });
        }; break;
        case 'events': {
            Event.findById(req.query.id)
                .then(event => {
                    res.send({ imgTitle: `${event.imgTitle}` });
                });
        }; break;
        case 'posts': {
            Post.findById(req.query.id) 
                .then(post => {
                    res.send({ imgTitle: `${post.imgTitle}` });
                });
        }
        default: break;
    }
};

exports.getListFiles = (req, res) => {
    const fs = require('fs');
    const directoryPath = `${appDir}/resources/static/assets/uploads/`;

    fs.readdir(directoryPath, (err, files) => {
        if (err) {
            return res.status(500).send({
                message: 'Unable to scan files'
            });
        }

        let fileInfos = [];

        files.forEach(file => {
            fileInfos.push({
                name: file,
                url: appDir + file
            });
        });

        console.log(fileInfos);
        res.status(200).send(fileInfos);
    });
};