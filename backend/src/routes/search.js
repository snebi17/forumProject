const router = require('express').Router();
const searchController = require('../controllers/find');

module.exports = searchRouter => {
    
    searchRouter.use((req, res, next) => {
        res.header(
            'Access-Control-Allow-Headers',
            'x-access-token, Origin, Content-Type, Accept'
        );
        next();
    });    

    router.get('/:name', searchController.getFighter);

    searchRouter.use('/api/events', router);
};