const Sequelize = require('sequelize');
const db = require('../utils/db');
const Users = require('./Users');
const ReplyComments = require('./ReplyComments');
const Posts = require('./Posts');

const ParentComments = db.define(
  'parentComments',
  {
    content: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  { timestamps: false }
);

Users.hasMany(ParentComments);
ParentComments.belongsTo(Users);
Posts.hasMany(ParentComments);
ParentComments.belongsTo(Posts);
ParentComments.hasOne(ReplyComments);
ReplyComments.belongsTo(ParentComments);

// ParentComments.sync({ force: true });
// ReplyComments.sync({ force: true });

module.exports = ParentComments;
