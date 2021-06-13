const mongoose = require('mongoose');

const Post = mongoose.model('Post');
const User = mongoose.model('User');

exports.findPosts = (req, res) => {
    Post.find()
        .then(posts => {
            if (!posts) {
                return res.status(400).send({ message: 'Novice niso bile najdene' });
            }
            res.json({ posts });
        })
        .catch(err => res.status(500).send({ message: err }));
};

exports.findOnePost = (req, res) => {
    Post.findById(req.params.id)
        .then(post => {
            if (!post) {
                return res.status(400).send({ message: 'Novica ni bila najdena' });
            }
            res.json({ post });
        })
        .catch(err => res.status(500).send({ message: err }));
};

exports.addPost = (req, res) => {
    let post = req.body.data;

    let newPost = new Post({
        title: post.title,
        body: post.body,
        author: post.author,
        imgTitle: post.imgTitle
    });

    console.log(newPost);

    newPost.save(newPost)
        .then(() => res.status(200).send({ message: 'Novica dodana' }))
        .catch(err => res.status(500).send({ message: err }));
};

exports.editPost = (req, res) => {
    let newData = req.body; 
    Post.findById(req.params.id)
        .then(post => {
            newData.title === null || (post.title = newData.title);
            newData.body === null || (post.body = newData.body);
            newData.imgTitle === null || (post.imgTitle = newData.imgTitle);
            post.save()
                .then(() => res.status(200).send({ message: 'Objava uspešno posodobljena'}))
                .catch(() => res.status(500).send({ message: 'Napaka' }));
        })
        .catch(err => console.log(err));
}; 

exports.removePost = (req, res) => {
    Post.findByIdAndDelete(req.params.id)
        .then(() => res.status(200).send({ message: 'Novica odstranjena' }))
        .catch(err => res.status(500).send({ message: err }));
}

exports.addComment = (req, res) => {
    if (!req.body.comment || req.body.comment.body.length == 0) {
        return res.status(500).send({ message: 'Dodajte komentar preden ga objavite' });
    }
    Post.findById(req.params.id)
        .then(post => {
            if (!post) {
                return res.status(400).send({ message: 'Ta novica ne obstaja več' });
            }
            let comment = req.body.comment;
            console.log(comment);
            post.updateOne({ $push: { comments: comment } })
                .then(res => console.log(res))
                .catch(err => console.log(err));
        })
};

exports.removeComment = (req, res) => {
    console.log(req.params);
    Post.findById(req.params.id)
        .then(post => {
            if (!post) {
                return res.status(400).send({ message: 'Ta novica ne obstaja več' })
            }
            post.updateOne({ $pull: { comments: { _id: req.params.comId }}})
                .then(res => console.log(res))
                .catch(err => console.log(err));
        });
};

exports.editComment = (req, res) => {
    Post.findById(req.params.id)
        .then(post => {
            post.comments.findOne(req.params.commentId)
                .then(comment => {
                    console.log(comment);
                })
                .catch(err => console.log(err));
        })
};