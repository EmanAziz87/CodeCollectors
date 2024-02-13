const db = require('../utils/db');

const CommentLikes = db.define('commentlikes', {}, { timestamps: false });

// CommentLikes.sync({ alter: true });

module.exports = CommentLikes;
