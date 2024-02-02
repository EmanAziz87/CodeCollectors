const snippetsRouter = require('express').Router();

snippetsRouter.get('/', (req, res) => {
  res.send('welcome to the snippets route');
});

module.exports = snippetsRouter;
