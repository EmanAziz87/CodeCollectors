const supertest = require('supertest');
const app = require('../app');
const Users = require('../models/Users');
const Posts = require('../models/Posts');
const Hubs = require('../models/Hubs');
const Snippets = require('../models/Snippets');
const Comments = require('../models/Comments');
const CommentLikes = require('../models/CommentLikes');
const PostLikes = require('../models/PostLikes');

const api = supertest(app);

const createUserAndLogin = async (
  name = 'test',
  username = 'testusername',
  password = 'testpassword',
  subscribedHubs = ['Java', 'Python']
) => {
  const newUser = {
    name,
    username,
    password,
    subscribedHubs,
  };

  const userResponse = await api
    .post('/api/users')
    .send(newUser)
    .expect('Content-Type', /application\/json/)
    .expect(201);

  const user = userResponse.body;

  const loginResponse = await api
    .post('/api/login')
    .send({ username: newUser.username, password: newUser.password })
    .expect('Content-Type', /application\/json/)
    .expect(200);

  const token = loginResponse.body.token;

  return { user, token };
};

const creatingPost = async (token) => {
  const hubs = await getAllHubs();

  const createdSnippet = await creatingSnippet(token);
  const hub = hubs[0];

  const newPost = {
    title: 'test',
    author: 'test',
    content: 'test',
    snippetId: createdSnippet.id,
    hubId: hub.id,
  };

  const postResponse = await api
    .post('/api/posts')
    .set('Authorization', `Bearer ${token}`)
    .send(newPost)
    .expect('Content-Type', /application\/json/)
    .expect(201);

  return postResponse.body;
};

const creatingSnippet = async (token) => {
  const newSnippet = {
    title: 'a cool snippet',
    content: 'this is the snippet',
    language: 'Java',
  };

  const response = await api
    .post('/api/snippets')
    .set('Authorization', `Bearer ${token}`)
    .send(newSnippet)
    .expect('Content-Type', /application\/json/)
    .expect(201);

  return response.body;
};

const creatingComment = async (token, postId) => {
  const newComment = {
    content: 'a test comment',
    postId,
  };

  const response = await api
    .post(`/api/comments/${postId}`)
    .set('Authorization', `Bearer ${token}`)
    .send(newComment)
    .expect(201)
    .expect('Content-Type', /application\/json/);

  return response.body;
};

const oneHub = {
  name: 'JavaScript',
  subscribers: 1254,
  adminHub: true,
};

const hubs = [
  {
    name: 'JavaScript',
    subscribers: 1254,
    adminHub: true,
  },
  {
    name: 'C++',
    subscribers: 678,
    adminHub: true,
  },
  {
    name: 'Python',
    subscribers: 1134,
    adminHub: true,
  },
  {
    name: 'Java',
    subscribers: 976,
    adminHub: true,
  },
  {
    name: 'React',
    subscribers: 374,
    adminHub: true,
  },
];

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

const oneSnippet = {
  title: 'a cool snippet',
  content: 'this is the snippet',
  language: 'Java',
};

const snippets = [
  {
    title: 'a cool snippet',
    content: 'this is the snippet',
    language: 'Java',
  },
  {
    title: 'another snippet',
    content: 'more snippet content',
    language: 'Python',
  },
  {
    title: 'last mock snippet title',
    content: 'last mock snippet content',
    language: 'JavaScript',
  },
];

const getAllCommentLikes = async () => {
  return await CommentLikes.findAll();
};

const getAllPostLikes = async () => {
  return await PostLikes.findAll();
};

const getAllComments = async (postId) => {
  const comments = await Comments.findAll({ where: { postId } });
  return comments.map((comment) => comment.toJSON());
};

const getComment = async (commentId) => {
  return await Comments.findByPk(commentId);
};

const getAllSnippets = async () => {
  const snippets = await Snippets.findAll();
  return snippets.map((snip) => snip.toJSON());
};

const getSnippet = async (id) => {
  return await Snippets.findByPk(id);
};

const getAllHubs = async () => {
  const hubs = await Hubs.findAll();
  return hubs.map((hub) => hub.toJSON());
};

const getHub = async (id) => {
  return await Hubs.findByPk(id);
};

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

const getUser = async (id) => {
  return await Users.findByPk(id);
};

module.exports = {
  creatingComment,
  createUserAndLogin,
  creatingPost,
  creatingSnippet,
  getAllCommentLikes,
  getAllPostLikes,
  getAllComments,
  getComment,
  getAllSnippets,
  getSnippet,
  getAllUsers,
  getUser,
  getAllHubs,
  getHub,
  getAllPosts,
  getAPost,
  snippets,
  oneSnippet,
  posts,
  hubs,
  oneHub,
};
