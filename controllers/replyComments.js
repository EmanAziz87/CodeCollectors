const replyCommentRouter = require('express').Router();
const ParentComments = require('../models/ParentComments');
const ReplyComments = require('../models/ReplyComments');

replyCommentRouter.get('/', async (req, res, next) => {
  try {
    const allReplies = await ReplyComments.findAll();
    res.send(allReplies);
  } catch (error) {
    next(error);
  }
});

replyCommentRouter.post('/:parentId', async (req, res, next) => {
  const parentId = req.params.parentId;
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
    const findParent = await ParentComments.findByPk(parentId);
    const createdReply = await ReplyComments.create({
      ...req.body,
      author: req.user.username,
    });

    await findParent.addReplyComment(createdReply);
    res.status(201).send(createdReply);
  } catch (error) {
    next(error);
  }
});

module.exports = replyCommentRouter;
