const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const config = require('../config/auth');

const User = mongoose.model('User');
const Token = mongoose.model('Token');

exports.register = (req, res) => {
    let { username, password, email } = req.body;

    if (!username || !password || !email) {
        return res.status(400).send({ 
            message: 'Prosimo, izpolnite vsa polja'
        });
    }

    if (username.length > 32 || password.length > 64 || email.length > 64) {
        return res.status(413).send({ 
            message: 'Polje je predolgo'
        });
    }

    let newUser = new User({
        username: username,
        email: email
    });

    newUser.hashPassword(password);

    newUser.save(newUser)
        .then(() => res.status(201).send({
                message: 'Registracija je bila uspešna'
        }))
        .catch(err => {
            console.log(err);
            res.status(400).send({
                message: err
            });
        });
};

exports.login = (req, res) => {
    let { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).send({
            message: 'Prosimo, izpolnite vsa polja.'
        });
    }

    User.findOne({ 'email': email })
        .then(user => {
            if (!user) {
                return res.status(404).send({
                    message: 'Uporabnik ne obstaja.'
                });
            }
            if (!user.checkPassword(password)) {
                return res.status(400).send({
                    message: 'Geslo ni pravilno.'
                });
            }

            let JWT = user.generateJWT();
            let newToken = new Token({ token: JWT });
            
            newToken.save(newToken)
                .then(() => {
                    res.status(200).send({
                        JWT: newToken
                    });
                })
                .catch(err => {
                    res.status(400).send({
                        message: err.message
                    });
                });
        })
        .catch(err => {
            res.status(400).send({
                message: err.message
            });
        });
};

exports.logout = (req, res) => {
    Token.deleteOne({ 'token': req.headers['x-access-token'] })
        .then(token => {
            if (!token) {
                return res.status(404).json({
                    message: 'Token does not exist!'
                });
            }
            res.status(200).send({
                message: 'Logged out!'
            });
        })
        .catch(err => {
            res.status(500).send({
                message: err
            });
        });
};

exports.sendLink = (req, res) => {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'info.forumma@gmail.com',
            pass: 'RMemcdM_7'
        }
    });

    let emailToken = jwt.sign({ email: req.query.email }, config.secret, { expiresIn: '30min' });

    let newToken = new Token({ token: emailToken });
    newToken.save(newToken)
        .then(() => {
            const url = `http://localhost:8080/lost-password/?token=${emailToken}`;

            let mailOptions = {
                from: 'info.forumma@gmail.com',
                to: req.query.email,
                subject: 'Ponastavitev gesla',
                text: 'Kliknite na link, da ponastavite geslo za vaš račun na ForuMMA!',
                html: `<p style="font-weight: bold">Kliknite na link, da ponastavite geslo za vaš račun<br></p><a href="${url}">${url}</a>`
            };

            transporter.sendMail(mailOptions, (err, res) => {
                if (err) {
                    res.status(500).send({
                        message: 'Elektronske pošte ni bilo mogoče poslati'
                    });
                }
                else {
                    res.status(200).send({
                        message: 'Elektronska pošta je bila uspešno poslana'
                    });
                }
            });
        })
        .catch(err => res.status(500).send({ message: 'Prišlo je do napake' }));
};

exports.resetPassword = (req, res) => {
    if (req.body.data.password !== req.body.data.rPassword) 
        return res.status(404).send({ message: 'Gesli se ne ujemata' });

    let ca = req.body.headers.Authorization;
    let base64Url = ca.split('.')[1];
    let decodedData = JSON.parse(Buffer.from(base64Url, 'base64').toString());

    let data = {
        email: decodedData.email,
        password: req.body.data.password
    };

    User.findOne({ email: data.email})
        .then(user => {
            if (!user) {
                return res.status(404).send({
                    message: 'Uporabnik ne obstaja'
                });
            }
            user.resetPassword(data.password);
            user.save()
                .then(() => res.status(200).send({
                    message: 'Uspešno ste ponastavili geslo, kliknite gumb za vrnitev na prijavno stran'
                }))
                .catch(err => {
                    console.log(err);
                    res.status(500).send({
                        message: 'Ponastavljanje gesla ni bilo uspešno'
                    })
                });
        })
        .catch(err => {
            console.log(err);
            res.status(500).send({
                message: 'Prišlo je do napake'
            });
        });
};