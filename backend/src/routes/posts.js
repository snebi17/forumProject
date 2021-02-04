const router = require('express').Router();
const authJWT = require('../middlewares/authJWT');
const usersController = require('../controllers/users');

module.exports = postsRouter => {
    
    postsRouter.use((req, res, next) => {
        res.header(
            'Access-Control-Allow-Headers',
            'x-access-token, Origin, Content-Type, Accept'
        );
        next();
    });

    // router.get('/:id', [authJWT.verifyTokenUser], usersController.findByID);

    // router.delete('/:id', [authJWT.verifyTokenUser], usersController.delete);

    // router.put('/:id', [authJWT.verifyTokenUser], usersController.update);

    // usersRouter.use('/api/users', router);

    postsRouter.use('/api/posts', router);
};