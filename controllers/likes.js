const likesRouter = require('express').Router();
const PostLikes = require('../models/PostLikes');
const CommentLikes = require('../models/CommentLikes');
const Posts = require('../models/Posts');
const Comments = require('../models/Comments');

likesRouter.get('/posts', async (req, res, next) => {
  try {
    const postLikes = await PostLikes.findAll();
    res.send(postLikes);
  } catch (error) {
    next(error);
  }
});

likesRouter.get('/comments', async (req, res, next) => {
  try {
    const commentLikes = await CommentLikes.findAll();
    res.send(commentLikes);
  } catch (error) {
    next(error);
  }
});

likesRouter.post('/posts/:postId', async (req, res, next) => {
  const postId = req.params.postId;

  if (!req.user) {
    return res.status(401).send({
      error: 'Need to authenticate to do that...tokens probably invalid',
    });
  }

  const likedAlready = await PostLikes.findOne({
    where: { postId, userId: req.user.id },
  });

  if (likedAlready) {
    return res.status(400).send({ error: 'already liked this post' });
  }

  try {
    const post = await Posts.findByPk(postId);
    const likesInstance = await PostLikes.create();
    await post.addPostlike(likesInstance);
    await req.user.addPostlike(likesInstance);
    res.status(204).send('liked post');
  } catch (error) {
    next(error);
  }
});

likesRouter.post('/comments/:commentId', async (req, res, next) => {
  const commentId = req.params.commentId;

  if (!req.user) {
    return res.status(401).send({
      error: 'Need to authenticate to do that...tokens probably invalid',
    });
  }

  const likedAlready = await CommentLikes.findOne({
    where: { commentId, userId: req.user.id },
  });

  if (likedAlready) {
    return res.status(400).send({ error: 'already liked this comment' });
  }

  try {
    const comment = await Comments.findByPk(commentId);
    const likesInstance = await CommentLikes.create();
    await comment.addCommentlike(likesInstance);
    await req.user.addCommentlike(likesInstance);
    res.status(204).send('liked comment');
  } catch (error) {
    next(error);
  }
});

module.exports = likesRouter;
