const postsRouter = require('express').Router();
const Posts = require('../models/Posts');

postsRouter.get('/', async (req, res, next) => {
  try {
    const allPosts = await Posts.findAll();
    res.send(allPosts);
  } catch (error) {
    next(error);
  }
});

postsRouter.post('/', async (req, res, next) => {
  const { title, author, content } = req.body;

  if (!(title && author && content)) {
    return response.status(400).send({ error: 'invalid submission info' });
  }

  try {
    const createdPost = await Posts.create({ ...req.body });
    res.status(201).send(createdPost);
  } catch (error) {
    next(error);
  }
});

postsRouter.patch('/:id', async (req, res, next) => {
  const { content } = req.body;
  const id = req.params.id;

  try {
    const post = await Posts.findByPk(id);
    post.content = content;
    await post.save();
    res.status(204).end();
  } catch (error) {
    next(error);
  }
});

postsRouter.delete('/:id', async (req, res, next) => {
  const id = req.params.id;

  try {
    await Posts.destroy({ where: { id } });
    res.status(204).end();
  } catch (error) {
    next(error);
  }
});

module.exports = postsRouter;
