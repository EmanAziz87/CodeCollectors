const Sequelize = require('sequelize');
const db = require('../utils/db');

const Snippets = db.define(
  'snippets',
  {
    title: {
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

Snippets.sync({ force: true }).then(async () => {
  Snippets.bulkCreate([
    {
      title: 'snippet title one',
      content: 'revolutionary content',
    },
    {
      title: 'snippet title two',
      content: 'even more revolutionary content',
    },
  ]);
});

module.exports = Snippets;
