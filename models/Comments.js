const Sequelize = require('sequelize');
require('sequelize-hierarchy-next')(Sequelize);
const db = require('../utils/db');
const Users = require('./Users');
const Posts = require('./Posts');
const CommentLikes = require('./CommentLikes');

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
    likes: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    childrenComments: {
      type: Sequelize.ARRAY(Sequelize.JSON),
      defaultValue: [],
    },
  },
  { timestamps: false }
);

Comments.isHierarchy({ onDelete: 'CASCADE' });

// db.sync({ alter: true }).then(async () => {
//   await Comments.sync({ alter: true });
//   await db.models.commentsancestor.sync({ alter: true });
// });

module.exports = Comments;
