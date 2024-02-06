const loginRouter = require('express').Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Users = require('../models/Users');

loginRouter.post('/', async (req, res, next) => {
  const { username, password } = req.body;

  const userMatch = await Users.findOne({ where: { username } });

  const passwordMatch = userMatch
    ? await bcrypt.compare(password, userMatch.password)
    : null;

  if (!userMatch || !passwordMatch) {
    return res.status(401).send({ error: 'invalid credentials' });
  }

  const userToken = {
    id: userMatch.id,
    name: userMatch.name,
    username: userMatch.username,
  };

  const token = jwt.sign(userToken, process.env.JWT_SECRET, {
    expiresIn: 60 * 60,
  });

  try {
    res.status(200).send({
      token,
      username: userMatch.username,
      name: userMatch.name,
      subscribedHubs: userMatch.subscribedHubs,
      id: userMatch.id,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = loginRouter;
