const db = require('../utils/db');

const PostLikes = db.define('postlikes', {}, { timestamps: false });

module.exports = PostLikes;
