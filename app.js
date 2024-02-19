require('dotenv').config();
const express = require('express');
const app = express();

const usersRouter = require('./controllers/users');
const postsRouter = require('./controllers/posts');
const hubsRouter = require('./controllers/hubs');
const snippetsRouter = require('./controllers/snippets');
const loginRouter = require('./controllers/login');
const commentRouter = require('./controllers/comments');
const likesRouter = require('./controllers/likes');
const testingRouter = require('./controllers/testing');
require('./utils/db');
require('./models/Comments');
const {
  unknownEndpoint,
  errorHandler,
  getToken,
  userExtractor,
} = require('./utils/middleware');

app.use(express.json());
app.use(express.static('dist'));
app.use(getToken);

app.use('/api/users', userExtractor, usersRouter);
app.use('/api/login', loginRouter);
app.use('/api/posts', userExtractor, postsRouter);
app.use('/api/comments', userExtractor, commentRouter);
app.use('/api/likes', userExtractor, likesRouter);
app.use('/api/hubs', userExtractor, hubsRouter);
app.use('/api/snippets', userExtractor, snippetsRouter);

if (process.env.NODE_ENV === 'test') {
  const testingRouter = require('./controllers/testing');
  app.use('/api/testing', testingRouter);
}

app.use(unknownEndpoint);
app.use(errorHandler);

module.exports = app;
