const Sequelize = require('sequelize');
const db = require('../utils/db');

const Hubs = db.define(
  'hubs',
  {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    subscribers: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    adminHub: {
      type: Sequelize.BOOLEAN,
    },
  },
  { timestamps: false }
);

// Hubs.sync({ alter: true }).then(async () => {
//   Hubs.bulkCreate([
//     { name: 'JavaScript', subscribers: 484, adminHub: true },
//     { name: 'C++', subscribers: 326, adminHub: true },
//     { name: 'React', subscribers: 379, adminHub: true },
//     { name: 'Java', subscribers: 473, adminHub: true },
//     { name: 'Python', subscribers: 481, adminHub: true },
//   ]);
// });

module.exports = Hubs;
