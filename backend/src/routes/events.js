const router = require('express').Router();
const authJWT = require('../middlewares/authJWT');
const eventController = require('../controllers/events');

module.exports = eventsRouter => {
    
    eventsRouter.use((req, res, next) => {
        res.header(
            'Access-Control-Allow-Headers',
            'x-access-token, Origin, Content-Type, Accept'
        );
        next();
    });
    
    router.post('/', eventController.addEvent);
    
    router.get('/', eventController.getEvents);

    router.get('/:id', eventController.getEvent);

    router.delete('/:id', eventController.removeEvent);

    router.put('/:id', eventController.editEvent);

    eventsRouter.use('/api/events', router);
};