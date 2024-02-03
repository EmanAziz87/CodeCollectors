const Sequelize = require('sequelize');
const db = require('../utils/db');

const Posts = db.define('posts', {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  author: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  content: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

// Posts.sync()

module.exports = Posts;
