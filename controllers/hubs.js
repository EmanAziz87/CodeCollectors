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

hubsRouter.get('/:id', async (req, res, next) => {
  const id = req.params.id;
  try {
    const hub = await Hubs.findByPk(id);
    res.send(hub);
  } catch (error) {
    next(error);
  }
});

hubsRouter.patch('/:id', async (req, res, next) => {
  const id = req.params.id;

  if (!req.user) {
    return res
      .status(401)
      .send({ error: 'you are not authenticated to do that' });
  }

  const hub = await Hubs.findByPk(id);

  const alreadySubscribed = req.user.subscribedHubs.find(
    (userHub) => userHub === hub.name
  );

  if (alreadySubscribed) {
    return res.status(400).send('already subscribed');
  }

  try {
    hub.subscribers = hub.subscribers + 1;
    req.user.subscribedHubs = [...req.user.subscribedHubs, hub.name];
    await hub.save();
    await req.user.save();
    res.status(204).send(hub);
  } catch (error) {
    next(error);
  }
});

module.exports = hubsRouter;
