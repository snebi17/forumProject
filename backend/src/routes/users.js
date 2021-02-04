const router = require('express').Router();
const authJWT = require('../middlewares/authJWT');
const usersController = require('../controllers/users');

module.exports = usersRouter => {

    usersRouter.use((req, res, next) => {
        res.header(
            'Access-Control-Allow-Headers',
            'x-access-token, Origin, Content-Type, Accept'
        );
        next();
    });

    router.post('/sign-in', usersController.getUser);

    router.post('/sign-up', usersController.createUser);

    router.put('/:id', usersController.updateUser);

    // [
    //     check('username', 'Please enter a valid username!')
    //     .not()
    //     .isEmpty(),
    //     check('email', 'Please enter a valid email').isEmail(),
    //     check('password', 'Please enter a valid password!').isLength({ min: 8 })
    // ]

    // router.get('/sign-in', (req, res) => {
    //     res.json({ message: 'Works' });
    //     usersController.findUser;
    // });

    // router.get('/:id', [authJWT.verifyTokenUser], usersController.findByID);

    // router.delete('/:id', [authJWT.verifyTokenUser], usersController.delete);

    // router.put('/:id', [authJWT.verifyTokenUser], usersController.update);

    usersRouter.use('/api/users', router);
};