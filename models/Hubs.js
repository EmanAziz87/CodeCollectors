const Sequelize = require('sequelize');
const db = require('../utils/db');

const Hubs = db.define('hubs', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  subscribers: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

// Hubs.sync();

module.exports = Hubs;
