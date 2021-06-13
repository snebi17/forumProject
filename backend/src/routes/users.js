const router = require('express').Router();
const authJWT = require('../middlewares/authJWT');
const registerCheck = require('../middlewares/registerCheck');
const usersController = require('../controllers/users');

module.exports = usersRouter => {

    usersRouter.use((req, res, next) => {
        res.header(
            'Access-Control-Allow-Headers',
            'x-access-token, Origin, Content-Type, Accept'
        );
        next();
    });

    router.get('/:id', /*[authJWT.verifyTokenUser]*/ usersController.findUser);

    router.get('/', usersController.findByUsername);

    router.delete('/:id', [authJWT.verifyTokenUser], usersController.deleteUser);

    router.put('/:id', [authJWT.verifyTokenUser, registerCheck.checkUniqueUsernameEmail], usersController.updateUser);

    usersRouter.use('/api/users', router);
};

