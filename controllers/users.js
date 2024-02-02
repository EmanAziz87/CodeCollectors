const usersRouter = require('express').Router();

usersRouter.get('/', (req, res) => {
  res.send('hello from the users route');
});

module.exports = usersRouter;
