const postsRouter = require('express').Router();

postsRouter.get('/', (req, res) => {
  res.send('welcome to the posts route');
});

module.exports = postsRouter;
