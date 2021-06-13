const router = require('express').Router();
const authJWT = require('../middlewares/authJWT');
const postController = require('../controllers/posts');
// const { route } = require('../server');

module.exports = postsRouter => {
    
    postsRouter.use((req, res, next) => {
        res.header(
            'Access-Control-Allow-Headers',
            'x-access-token, Origin, Content-Type, Accept'
        );
        next();
    });
    
    router.get('/', postController.findPosts);
    
    router.get('/:id', postController.findOnePost);

    router.post('/', postController.addPost);

    router.delete('/:id', postController.removePost);
    
    router.put('/:id', postController.editPost);
    
    router.post('/:id', postController.addComment);

    router.delete('/:id/:comId', postController.removeComment);

    router.put('/:id/comId', postController.editComment);

    postsRouter.use('/api/posts', router);
};