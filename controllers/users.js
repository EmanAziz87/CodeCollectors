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
  const { name, username, password } = req.body;

  if (!(name || username || password)) {
    return response
      .status(400)
      .json({ error: 'Did not provide name, username, or password' });
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const newUser = {
    name,
    username,
    password: passwordHash,
  };

  try {
    const createdUser = await Users.create(newUser);
    res.status(201).send(createdUser);
  } catch (error) {
    next(error);
  }
});

module.exports = usersRouter;
