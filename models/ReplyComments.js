const Sequelize = require('sequelize');
const db = require('../utils/db');

const ReplyComments = db.define(
  'replyComments',
  {
    content: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    author: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    repliedComments: {
      type: Sequelize.ARRAY(Sequelize.STRING),
      allowNull: false,
      defaultValue: [],
    },
    parentCommentId: {
      type: Sequelize.INTEGER,
      defaultValue: null,
    },
  },
  { timestamps: false }
);

module.exports = ReplyComments;
