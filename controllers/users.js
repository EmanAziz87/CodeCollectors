const usersRouter = require('express').Router();
const Users = require('../models/Users');
const bcrypt = require('bcrypt');

usersRouter.get('/', async (req, res) => {
  const allUsers = await Users.findAll();
  res.send(allUsers);
});

usersRouter.get('/:id', async (req, res, next) => {
  const id = req.params.id;
  try {
    const user = await Users.findOne({
      where: { id },
      attributes: ['id', 'name', 'username', 'subscribedHubs'],
    });
    res.send(user);
  } catch (error) {
    next(error);
  }
});

usersRouter.post('/', async (req, res, next) => {
  const { name, username, password, subscribedHubs } = req.body;

  if (!(name && username && password)) {
    return res
      .status(400)
      .json({ error: 'Did not provide name, username, or password' });
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const newUser = {
    name,
    username,
    password: passwordHash,
    subscribedHubs,
  };

  try {
    const createdUser = await Users.create(newUser);
    res.status(201).send(createdUser);
  } catch (error) {
    next(error);
  }
});

usersRouter.delete('/:id', async (req, res, next) => {
  const id = req.params.id;

  const user = await Users.findByPk(id);

  if (user.id !== req?.user.id) {
    return res.status(401).send({
      error: 'Need to authenticate to do that...tokens probably invalid',
    });
  }

  try {
    await Users.destroy({ where: { id } });
    res.status(204).end();
  } catch (error) {
    next(error);
  }
});

module.exports = usersRouter;
