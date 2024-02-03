const hubsRouter = require('express').Router();
const Hubs = require('../models/Hubs');

hubsRouter.get('/', (req, res) => {
  res.send('this is the hubs route');
});

module.exports = hubsRouter;
