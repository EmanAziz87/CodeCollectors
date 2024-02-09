const Sequelize = require('sequelize');
const db = require('../utils/db');

const ReplyComments = db.define(
  'reply_comments',
  {
    content: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    replied_comments: {
      type: Sequelize.ARRAY(Sequelize.STRING),
      allowNull: false,
    },
  },
  { timestamps: false }
);

module.exports = ReplyComments;
