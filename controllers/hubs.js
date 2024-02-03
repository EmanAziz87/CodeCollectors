const hubsRouter = require('express').Router();
const Hubs = require('../models/Hubs');

hubsRouter.get('/', async (req, res, next) => {
  try {
    const allHubs = await Hubs.findAll();
    res.send(allHubs);
  } catch (error) {
    next(error);
  }
});

hubsRouter.patch('/:id', async (req, res, next) => {
  const id = req.params.id;
  const hub = await Hubs.findByPk(id);
  hub.subscribers = hub.subscribers + 1;
  await hub.save();

  try {
    res.send(hub);
  } catch (error) {
    next(error);
  }
});

module.exports = hubsRouter;
