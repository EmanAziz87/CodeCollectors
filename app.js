require('dotenv').config();
const express = require('express');
const app = express();

const usersRouter = require('./controllers/users');
const postsRouter = require('./controllers/posts');
const hubsRouter = require('./controllers/hubs');
const snippetsRouter = require('./controllers/snippets');
require('./utils/db');
const { unknownEndpoint, errorHandler } = require('./utils/middleware');

app.use(express.json());

app.use('/api/users', usersRouter);
app.use('/api/posts', postsRouter);
app.use('/api/hubs', hubsRouter);
app.use('/api/snippets', snippetsRouter);

app.use(unknownEndpoint);
app.use(errorHandler);

module.exports = app;
