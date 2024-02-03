const usersRouter = require('express').Router();
const Users = require('../models/Users');
const bcrypt = require('bcrypt');

usersRouter.get('/', async (req, res) => {
  const allUsers = await Users.findAll();
  res.send(allUsers);
});

usersRouter.post('/', async (req, res, next) => {
  const { name, username, password } = req.body;

  if (!(name || username || password)) {
    response
      .status(400)
      .json({ error: 'Did not provide name, username, and password' });
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const newUser = {
    name,
    username,
    passwordHash,
  };

  try {
    const createdUser = await Users.create(newUser);
    res.status(201).json(createdUser);
  } catch (error) {
    next(error);
  }
});

module.exports = usersRouter;
