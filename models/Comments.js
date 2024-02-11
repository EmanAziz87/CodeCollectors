const Sequelize = require('sequelize');
require('sequelize-hierarchy-next')(Sequelize);
const db = require('../utils/db');
const Users = require('./Users');
const Posts = require('./Posts');

const Comments = db.define(
  'comments',
  {
    content: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    author: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    childrenComments: {
      type: Sequelize.ARRAY(Sequelize.JSON),
      defaultValue: [],
    },
  },
  { timestamps: false }
);

Comments.isHierarchy();

// db.sync({ alter: true }).then(async () => {
//   await Comments.sync({ alter: true });
//   await db.models.commentsancestor.sync({ alter: true });
// });

Users.hasMany(Comments, { onDelete: 'CASCADE' });
Comments.belongsTo(Users);
Posts.hasMany(Comments, { onDelete: 'CASCADE' });
Comments.belongsTo(Posts);

module.exports = Comments;
