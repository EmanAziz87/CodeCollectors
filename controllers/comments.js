const commentRouter = require('express').Router();
const Comments = require('../models/Comments');
const Posts = require('../models/Posts');

commentRouter.get('/:postId', async (req, res, next) => {
  const postId = req.params.postId;
  const comments = await Comments.findAll({ where: { postId } });
  const commentsFlat = [...comments];

  console.log(comments);

  const hierarchize = (parent, list) => {
    const children = list.filter((x) => x.parentId == parent.id);
    children.forEach((child) => hierarchize(child, list));
    parent.childrenComments = children;
  };

  const topLevel = commentsFlat.filter((x) => x.parentId === null);

  topLevel.forEach((top) => hierarchize(top, commentsFlat));

  try {
    res.send(topLevel);
    // res.send(commentsFlat);
  } catch (error) {
    next(error);
  }
});

commentRouter.post('/:postId', async (req, res, next) => {
  const postId = req.params.postId;
  const { content, parentId } = req.body;

  if (!content) {
    return res.status(400).send({ error: 'invalid submission info' });
  }

  if (!req.user) {
    return res.status(401).send({
      error: 'Need to authenticate to do that...tokens probably invalid',
    });
  }

  const comment = {
    author: req.user.username,
    content,
  };

  try {
    const parentPost = await Posts.findByPk(postId);
    const createdComment = await Comments.create(comment);
    if (parentId) {
      const findParent = await Comments.findByPk(parentId);
      await createdComment.setParent(findParent);
      await findParent.addChild(createdComment);
    }
    await parentPost.addComment(createdComment);
    res.status(201).send(createdComment);
  } catch (error) {
    next(error);
  }
});

commentRouter.delete('/:commentId', async (req, res, next) => {
  const commentId = req.params.commentId;

  if (!req.user) {
    return res.status(401).send({
      error: 'Need to authenticate to do that...tokens probably invalid',
    });
  }

  try {
    await Comments.destroy({ where: { id: commentId } });
    res.status(204).send('deleted comment');
  } catch (error) {}
});

module.exports = commentRouter;
