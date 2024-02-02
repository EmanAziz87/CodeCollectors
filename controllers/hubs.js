const hubsRouter = require('express').Router();

hubsRouter.get('/', (req, res) => {
  res.send('this is the hubs route');
});

module.exports = hubsRouter;
