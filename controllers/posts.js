const postsRouter = require('express').Router();
const Posts = require('../models/Posts');

postsRouter.get('/', (req, res) => {
  res.send('welcome to the posts route');
});

module.exports = postsRouter;
