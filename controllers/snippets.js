const snippetsRouter = require('express').Router();
const Snippets = require('../models/Snippets');

snippetsRouter.get('/', (req, res) => {
  res.send('welcome to the snippets route');
});

module.exports = snippetsRouter;
