const { json } = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');

const User = mongoose.model('User');
const Token = mongoose.model('Token');

exports.getUser = (req, res) => {
    let email = req.body.email;
    User.findOne({ email: email })
        .then(user => {
            console.log(JSON.stringify({ user }));
            if (!user) {
                return res.status(404).send({ 
                    message: 'No such user in database!'
                });
            }
            if (!user.checkPassword(req.body.password)) {
                return res.status(400).send({
                    message: 'Incorrect password!'
                });
            }

            let JWT = user.generateJWT();
            let newToken = new Token({ token: JWT });

            newToken.save(newToken)
                .then(() => {
                    return res.status(200).send({ 
                        'JWT Token': JWT
                    });
                })
                .catch(err => {
                    return res.status(400).send({
                        message: err.message
                    });
                });
                
            user.loggedIn = true;
        })
        .catch(err => {
            console.log(err);
            res.status(400).send({
                message: err.message
            });
        });
};

exports.createUser = (req, res) => {
    let { username, password, email } = req.body;
    
    if (!username || !password || !email) {
        return res.status(400).send({ 
            message: "All fields must be entered!"
        });
    }

    if (username.length > 32 || password.length > 64 || email.length > 64) {
        return res.status(413).send({ 
            message: "Field too long!" 
        });
    }

    User.find({ email })
        .then(user => {
            if (user) {
                return res.status(500).send({
                    message: 'User with these credentials already exists in database!'
                });
            }

            let newUser = new User({
                username: username,
                password: password,
                email: email
            });

            newUser.hashPassword(password);

            newUser.save()
                .then(response => {
                    return res.status(201).send({
                        message: 'User created!'
                    });
                })
                .catch(err => {
                    return res.status(400).send({
                        message: err
                    })
                });
        })
        .catch(err => {
            res.status(404).send({
                message: err
            })
        });
};

exports.updateUser = (req, res) => {

};