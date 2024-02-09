const parentCommentRouter = require('express').Router();
const Posts = require('../models/Posts');
const ParentComments = require('../models/ParentComments');

parentCommentRouter.get('/:postId', async (req, res, next) => {
  const postId = req.params.postId;
  try {
    const allComments = await ParentComments.findAll({
      where: { postId },
    });
    res.send(allComments);
  } catch (error) {
    next(error);
  }
});

parentCommentRouter.post('/:postId', async (req, res, next) => {
  const postId = req.params.postId;
  const { content } = req.body;

  if (!content) {
    return res.status(400).send({ error: 'invalid submission info' });
  }

  if (!req.user) {
    return res.status(401).send({
      error: 'Need to authenticate to do that...tokens probably invalid',
    });
  }

  try {
    const findPost = await Posts.findByPk(postId);
    const createdComment = await ParentComments.create({
      ...req.body,
      author: req.user.username,
    });
    console.log('FINDPOST: ', findPost);
    console.log('CREATEDCOMMENT: ', createdComment);
    await req.user.addParentComment(createdComment);
    await findPost.addParentComment(createdComment);
    res.status(201).send(createdComment);
  } catch (error) {
    next(error);
  }
});

module.exports = parentCommentRouter;
