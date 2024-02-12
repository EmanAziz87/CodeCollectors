const postsRouter = require('express').Router();
const Posts = require('../models/Posts');
const Snippets = require('../models/Snippets');
const Hubs = require('../models/Hubs');

postsRouter.get('/', async (req, res, next) => {
  try {
    const allPosts = await Posts.findAll();
    res.send(allPosts);
  } catch (error) {
    next(error);
  }
});

postsRouter.get('/:id', async (req, res, next) => {
  const id = req.params.id;
  try {
    const post = await Posts.findByPk(id);
    res.send(post);
  } catch (error) {
    next(error);
  }
});

postsRouter.post('/', async (req, res, next) => {
  const { title, author, content } = req.body;
  console.log('----------REQ.BODY', req.body);

  if (!(title && author && content)) {
    return res.status(400).send({ error: 'invalid submission info' });
  }

  if (!req.user) {
    return res.status(401).send({
      error: 'Need to authenticate to do that...tokens probably invalid',
    });
  }

  try {
    const thisPostsHub = await Hubs.findByPk(req.body.hubId);
    const thisPostsSnippet = await Snippets.findByPk(req.body.snippetId);
    const createdPost = await Posts.create({ ...req.body });
    await req.user.addPost(createdPost);
    await thisPostsHub.addPost(createdPost);
    await thisPostsSnippet.setPost(createdPost);
    res.status(201).send(createdPost);
  } catch (error) {
    next(error);
  }
});

postsRouter.patch('/:id', async (req, res, next) => {
  const { title, author, content } = req.body;
  const id = req.params.id;
  
  if (!(title && author && content)) {
    return res.status(400).send({ error: 'Invalid user input' });
  }

  const post = await Posts.findByPk(id);

  if (post.userId !== req.user?.id) {
    return res
      .status(401)
      .send({ error: 'You are not authenticated to do that' });
  }

  try {
    post.content = content;
    post.title = title;
    post.author = author;
    await post.save();
    res.status(204).send('updated post');
  } catch (error) {
    next(error);
  }
});

postsRouter.delete('/:id', async (req, res, next) => {
  const id = req.params.id;

  const post = await Posts.findOne({
    where: { id },
    attributes: ['userId'],
  });

  if (post.userId !== req.user?.id) {
    return res
      .status(401)
      .send({ error: 'You are not authenticated to do that' });
  }

  try {
    await Posts.destroy({ where: { id } });
    res.status(204).send('deleted post');
  } catch (error) {
    next(error);
  }
});

module.exports = postsRouter;
