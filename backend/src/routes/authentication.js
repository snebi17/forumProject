const router = require('express').Router();
const authJWT = require('../middlewares/authJWT');
const registerCheck = require('../middlewares/registerCheck');
const authenticationController = require('../controllers/authentication');

module.exports = authenticationRouter => {

    authenticationRouter.use((req, res, next) => {
        res.header(
            'Access-Control-Allow-Headers',
            'x-access-token, Origin, Content-Type, Accept'
        );
        next();
    });

    router.post('/register', [registerCheck.checkUniqueUsernameEmail], authenticationController.register);

    router.post('/login', authenticationController.login);

    router.post('/logout', authenticationController.logout);

    router.get('/reset-password', authenticationController.sendLink);

    router.post('/reset-password', [authJWT.verifyTokenWhitelist], authenticationController.resetPassword);

    authenticationRouter.use('/api/auth', router);

};