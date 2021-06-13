const router = require('express').Router();
const fighterController = require('../controllers/fighters');

module.exports = fighterRouter => {
    
    fighterRouter.use((req, res, next) => {
        res.header(
            'Access-Control-Allow-Headers',
            'x-access-token, Origin, Content-Type, Accept'
        );
        next();
    });

    router.get('', fighterController.getRankings);
    
    router.get('/:class', fighterController.getFighters);

    router.get('/name/:fullname', fighterController.getFighter);

    fighterRouter.use('/api/rankings', router);
};