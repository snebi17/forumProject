const mongoose = require('mongoose');
const User = mongoose.model('User');

exports.checkUniqueUsernameEmail = (req, res, next) => {
    //Check for duplicate usernames
    User.findOne({ 'username': req.body.username }) 
        .then(username => {
            if (username) {
                return res.status(409).send({
                    message: 'Uporabnik s tem imenom že obstaja'
                });
            }
            //Check for duplicate emails
            User.findOne({ 'email': req.body.email }) 
                .then(email => {
                    if (email) {
                        return res.status(409).send({
                            message: 'Uporabnik s tem email naslovom že obstaja'
                        })
                    }
                //If both are unique proceed to the next middleware

                next();

                })
                .catch(err => {
                    res.status(500).send({
                        message: err.message
                    })
                });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message
            });
        });
};