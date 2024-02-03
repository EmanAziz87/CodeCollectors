const Sequelize = require('sequelize');
const db = require('../utils/db');

const Snippets = db.define('snippets', {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  content: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

// Snippets.sync();

module.exports = Snippets;
