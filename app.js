require('dotenv').config();
const express = require('express');
const app = express();

const usersRouter = require('./controllers/users');
const postsRouter = require('./controllers/posts');
const hubsRouter = require('./controllers/hubs');
const snippetsRouter = require('./controllers/snippets');
const loginRouter = require('./controllers/login');
require('./utils/db');
const {
  unknownEndpoint,
  errorHandler,
  getToken,
  userExtractor,
} = require('./utils/middleware');

app.use(express.json());
app.use(getToken);

app.use('/api/users', usersRouter);
app.use('/api/login', loginRouter);
app.use('/api/posts', userExtractor, postsRouter);
app.use('/api/hubs', userExtractor, hubsRouter);
app.use('/api/snippets', userExtractor, snippetsRouter);

app.use(unknownEndpoint);
app.use(errorHandler);

module.exports = app;
