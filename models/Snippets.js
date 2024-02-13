const Sequelize = require('sequelize');
const db = require('../utils/db');
const Posts = require('./Posts');
const Users = require('./Users');

const Snippets = db.define(
  'snippets',
  {
    title: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    content: {
      type: Sequelize.STRING(5000),
      allowNull: false,
    },
    language: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  { timestamps: false }
);

Snippets.hasOne(Posts, { onDelete: 'CASCADE' });
Posts.belongsTo(Snippets);
Users.hasMany(Snippets, { onDelete: 'CASCADE' });
Snippets.belongsTo(Users);

// Snippets.sync({ alter: true });
// Posts.sync({ alter: true });

// Snippets.sync({ force: true }).then(async () => {
//   Snippets.bulkCreate([
//     {
//       title: 'snippet title one',
//       content: 'revolutionary content',
//     },
//     {
//       title: 'snippet title two',
//       content: 'even more revolutionary content',
//     },
//   ]);
// });

module.exports = Snippets;
