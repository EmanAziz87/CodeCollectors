const app = require('../app');
const supertest = require('supertest');
const helper = require('./testHelper');
const Users = require('../models/Users');
const Posts = require('../models/Posts');
const Comments = require('../models/Comments');
const CommentLikes = require('../models/CommentLikes');

const api = supertest(app);

describe('comment likes', () => {
  let createdPost;
  let createdComment;
  let createdUser;

  beforeEach(async () => {
    await Users.truncate({ cascade: true });
    await Posts.truncate({ cascade: true });
    await Comments.truncate({ cascade: true });
    await CommentLikes.truncate({ cascade: true });
    createdUser = await helper.createUserAndLogin();
    createdPost = await helper.creatingPost(createdUser.token);
    createdComment = await helper.creatingComment(
      createdUser.token,
      createdPost.id
    );
  });

  describe('getting comment likes', () => {
    test('getting all comment likes', async () => {
      const { token } = await helper.createUserAndLogin(
        'test2',
        'testusername2',
        'testpassword2'
      );

      await api
        .post(`/api/likes/comments/${createdComment.id}`)
        .set('Authorization', `Bearer ${createdUser.token}`)
        .expect(204);

      await api
        .post(`/api/likes/comments/${createdComment.id}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(204);

      const commentLikesAtStart = await helper.getAllCommentLikes();

      const response = await api
        .get('/api/likes/comments')
        .expect(200)
        .expect('Content-Type', /application\/json/);

      const allCommentLikes = response.body;
      expect(commentLikesAtStart).toHaveLength(allCommentLikes.length);
    });
  });

  describe('creating a comment like', () => {
    test('liking comment if authenticated', async () => {
      const { token } = await helper.createUserAndLogin(
        'test2',
        'testusername2',
        'testpassword2'
      );

      const commentLikesAtStart = await helper.getAllCommentLikes();

      await api
        .post(`/api/likes/comments/${createdComment.id}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(204);

      const commentLikesAtEnd = await helper.getAllCommentLikes();

      expect(commentLikesAtEnd).toHaveLength(commentLikesAtStart.length + 1);
    });
  });
});

describe('post likes', () => {
  let createdPost;
  let createdUser;

  beforeEach(async () => {
    await Users.truncate({ cascade: true });
    await Posts.truncate({ cascade: true });
    createdUser = await helper.createUserAndLogin();
    createdPost = await helper.creatingPost(createdUser.token);
  });

  describe('getting post likes', () => {
    test('getting all post likes', async () => {
      const { token } = await helper.createUserAndLogin(
        'test2',
        'testusername2',
        'testpassword2'
      );

      await api
        .post(`/api/likes/posts/${createdPost.id}`)
        .set('Authorization', `Bearer ${createdUser.token}`)
        .expect(204);

      await api
        .post(`/api/likes/posts/${createdPost.id}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(204);

      const postLikesAtStart = await helper.getAllPostLikes();

      const response = await api
        .get('/api/likes/posts')
        .expect(200)
        .expect('Content-Type', /application\/json/);

      const allPostLikes = response.body;
      expect(postLikesAtStart).toHaveLength(allPostLikes.length);
    });
  });

  describe('creating post likes', () => {
    test('liking post if authenticated', async () => {
      const { token } = await helper.createUserAndLogin(
        'test2',
        'testusername2',
        'testpassword2'
      );

      const postLikesAtStart = await helper.getAllPostLikes();

      await api
        .post(`/api/likes/posts/${createdPost.id}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(204);

      const postLikesAtEnd = await helper.getAllPostLikes();
      expect(postLikesAtEnd).toHaveLength(postLikesAtStart.length + 1);
    });
  });
});
