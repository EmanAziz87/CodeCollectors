const Sequelize = require('sequelize');
const db = require('../utils/db');

const Users = db.define('users', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  username: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  passwordHash: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

// Users.sync({ force: true });

module.exports = Users;
