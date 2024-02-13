const Sequelize = require('sequelize');
const db = require('../utils/db');
const Comments = require('./Comments');
const Hubs = require('./Hubs');
const Users = require('./Users');
const PostLikes = require('./PostLikes');
const CommentLikes = require('./CommentLikes');

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
Users.hasMany(PostLikes);
PostLikes.belongsTo(Users);
Posts.hasMany(PostLikes, { onDelete: 'CASCADE' });
PostLikes.belongsTo(Posts);
Users.hasMany(CommentLikes, { onDelete: 'CASCADE' });
CommentLikes.belongsTo(Users);
Users.hasMany(Comments, { onDelete: 'CASCADE' });
Comments.belongsTo(Users);
Posts.hasMany(Comments, { onDelete: 'CASCADE' });
Comments.belongsTo(Posts);
Comments.hasMany(CommentLikes, { onDelete: 'CASCADE' });
CommentLikes.belongsTo(Comments);

// db.sync({ alter: true });

module.exports = Posts;
