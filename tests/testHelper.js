const Users = require('../models/Users');
const Posts = require('../models/Posts');

const posts = [
  {
    title: 'JavaScript Recursive trick',
    author: 'tim',
    content: 'nothing to see',
  },
  {
    title: 'another great trick',
    author: 'tim',
    content: 'tricked you',
  },
  {
    title: 'prototypal inheritance',
    author: 'tim',
    content: 'here is how pi works...',
  },
];

const getAllPosts = async () => {
  const posts = await Posts.findAll();
  return posts.map((post) => post.toJSON());
};

const getAPost = async (id) => {
  return await Posts.findByPk(id);
};

const getAllUsers = async () => {
  const users = await Users.findAll();
  return users.map((user) => user.toJSON());
};

module.exports = { getAllUsers, getAllPosts, getAPost, posts };
