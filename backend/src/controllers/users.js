const { json } = require('body-parser');
const mongoose = require('mongoose');

const User = mongoose.model('User');
const Token = mongoose.model('Token');

exports.findUser = (req, res) => {
    User.findById(req.params.id)
        .then(user => {
            if (!user) {
                return res.status(500).send({
                    user: null,
                    message: 'User with this ID does not exist'
                });
            }
            res.json({
                user
            });
        })
        .catch(err => {
            res.status(400).send({
                message: err.message
            });
        });
};

exports.findByUsername = (req, res) => {
    User.findOne({ username: req.query.username })
        .then(user => {
            if (!user) {
                return res.status(500).send({
                    message: 'This user does not exist'
                });
            }
            res.json({
                user
            })
        })
        .catch(err => {
            res.status(400).send({
                message: err.message
            });
        });
}

exports.deleteUser = (req, res) => {
    User.findByIdAndDelete(req.params.id)
        .then(user => {
            if (!user) {
                return res.status(500).send({
                    message: 'User with this ID does not exist'
                });
            }
            res.status(200).send({
                message: 'User successfully deleted'
            })
        })
        .catch(err => {
            res.status(400).send({
                message: err.message
            })
        });
};

exports.updateUser = (req, res) => {
    let newData = req.body; 

    console.log(newData);
    User.findById(req.params.id)
        .then(user => {
            newData.username === null || (user.username = newData.username);
            newData.email === null || (user.email = newData.email);
            newData.imgTitle === null || (user.imgTitle = newData.imgTitle);
            console.log(user);  
            user.save()
                .then(() => res.status(200).send({ message: 'Uporabnik uspešno posodobljen'}))
                .catch(() => res.status(500).send({ message: 'Napaka' }));
        })
        .catch(err => console.log(err));
};