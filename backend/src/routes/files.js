const router = require('express').Router();
const fileController = require('../controllers/files');

module.exports = filesRouter => {
    
    filesRouter.use((req, res, next) => {
        res.header(
            'Access-Control-Allow-Headers',
            'x-access-token, Origin, Content-Type, Accept'
        );
        next();
    });
    
    router.post('/upload', fileController.upload);
    
    router.get('/files', fileController.getListFiles);

    router.get('/files/:name', fileController.download);

    filesRouter.use('/', router);
};