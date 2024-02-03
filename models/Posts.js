const Sequelize = require('sequelize');
const db = require('../utils/db');
const Hubs = require('./Hubs');
const Users = require('./Users');

const Posts = db.define(
  'posts',
  {
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
  },
  { timestamps: false }
);

Users.hasMany(Posts, { onDelete: 'CASCADE' });
Posts.belongsTo(Users);
Hubs.hasMany(Posts, { onDelete: 'CASCADE' });
Posts.belongsTo(Hubs);

// Posts.sync({ force: true }).then(async () => {
//   Posts.bulkCreate([
//     {
//       title: 'JavaScript Recursive trick',
//       author: 'tim',
//       content: 'nothing to see',
//     },
//     {
//       title: 'another great trick',
//       author: 'tim',
//       content: 'tricked you',
//     },
//   ]);
// });

module.exports = Posts;
