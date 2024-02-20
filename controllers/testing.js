const testingRouter = require('express').Router();
const Users = require('../models/Users');
const Posts = require('../models/Posts');
const Snippets = require('../models/Snippets');
const Comments = require('../models/Comments');
const Hubs = require('../models/Hubs');

testingRouter.post('/reset', (req, res) => {
  Users.truncate({ cascade: true });
  Posts.truncate({ cascade: true });
  Snippets.truncate({ cascade: true });
  Comments.truncate({ cascade: true });

  res.status(204).end();
});

module.exports = testingRouter;
