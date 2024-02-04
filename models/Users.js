const Sequelize = require('sequelize');
const db = require('../utils/db');

const Users = db.define(
  'users',
  {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    username: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: {
          args: [4, 100],
        },
      },
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [4, 100],
        },
      },
    },
    subscribedHubs: {
      type: Sequelize.ARRAY(Sequelize.STRING),
      defaultValue: [],
    },
  },
  { timestamps: false }
);

// Users.sync({ force: true });

module.exports = Users;
