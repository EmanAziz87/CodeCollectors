const jwt = require('jsonwebtoken');
const Users = require('../models/Users');

const getToken = (req, res, next) => {
  const authorization = req.get('Authorization');
  if (authorization && authorization.startsWith('Bearer ')) {
    req.token = authorization.replace('Bearer ', '');
  } else {
    req.token = null;
  }
  next();
};

const userExtractor = async (req, res, next) => {
  if (req.token) {
    const decodedToken = jwt.verify(req.token, process.env.JWT_SECRET);
    const user = await Users.findByPk(decodedToken.id);
    req.user = user;
  } else {
    req.user = null;
  }
  next();
};

const unknownEndpoint = (req, res, next) => {
  res.status(404).send('this route leads to no where...');
  next();
};

const errorHandler = (error, req, res, next) => {
  console.log('custom error handler log--- ', error);

  if (
    error.errors[0]?.message ===
    `Validation len on ${error.errors[0]?.path} failed`
  ) {
    return res.status(400).send({
      error: error.name,
      message: `the length on "${error.errors[0]?.path}" attribute failed validation`,
      sqlLiteral: error.sql,
    });
  }

  next(error);
};

module.exports = { unknownEndpoint, errorHandler, getToken, userExtractor };
