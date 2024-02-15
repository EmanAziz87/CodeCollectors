const app = require('../app');
const supertest = require('supertest');
const helper = require('./testHelper');
const Posts = require('../models/Posts');
const Comments = require('../models/Comments');
const Users = require('../models/Users');

const api = supertest(app);

describe('getting comments', () => {
  beforeEach(async () => {
    await Users.truncate({ cascade: true });
    await Posts.truncate({ cascade: true });
    await Comments.truncate({ cascade: true });
  });

  test('getting all comments of a post from the database', async () => {
    const { token } = await helper.createUserAndLogin();

    const createdPost = await helper.creatingPost(token);
    const createdComment = await helper.creatingComment(token, createdPost.id);

    expect(createdComment).not.toBe(false);

    const allComments = await helper.getAllComments(createdPost.id);

    const response = await api
      .get(`/api/comments/${createdPost.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/);

    const comments = response.body;

    expect(comments).toHaveLength(allComments.length);
  });
});

describe('creating comments in the database', () => {
  let createdPost;
  beforeEach(async () => {
    await Users.truncate({ cascade: true });
    await Posts.truncate({ cascade: true });
    await Comments.truncate({ cascade: true });
    const { token } = await helper.createUserAndLogin();
    createdPost = await helper.creatingPost(token);
    const createdComment = await helper.creatingComment(token, createdPost.id);
  });

  test('creating a comment on a post, if successfully authenticated', async () => {
    const commentsAtStart = await helper.getAllComments(createdPost.id);

    const { token } = await helper.createUserAndLogin(
      'test2',
      'test2',
      'test2'
    );

    const newComment = {
      content: 'a test comment',
      postId: createdPost.id,
    };

    const response = await api
      .post(`/api/comments/${createdPost.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send(newComment)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const createdComment = response.body;

    expect(createdComment).not.toBe(false);

    const commentsAtEnd = await helper.getAllComments(createdPost.id);

    expect(commentsAtEnd).toHaveLength(commentsAtStart.length + 1);
  });

  test('error if creating a comment while not authenticated', async () => {
    const commentsAtStart = await helper.getAllComments(createdPost.id);

    const newComment = {
      content: 'a test comment',
      postId: createdPost.id,
    };

    const response = await api
      .post(`/api/comments/${createdPost.id}`)
      .send(newComment)
      .expect(401)
      .expect('Content-Type', /application\/json/);

    const createdComment = response.body;

    expect(createdComment).not.toBe(false);

    const commentsAtEnd = await helper.getAllComments(createdPost.id);

    expect(commentsAtEnd).toHaveLength(commentsAtStart.length);
  });

  test('error if creating a comment with no content', async () => {
    const commentsAtStart = await helper.getAllComments(createdPost.id);

    const missingContent = {
      postId: createdPost.id,
    };

    const response = await api
      .post(`/api/comments/${createdPost.id}`)
      .send(missingContent)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    const createdComment = response.body;

    expect(createdComment).not.toBe(false);

    const commentsAtEnd = await helper.getAllComments(createdPost.id);

    expect(commentsAtEnd).toHaveLength(commentsAtStart.length);
  });
});

describe('updating comments in database', () => {
  let createdPost;
  let createdComment;
  let createdUser;

  beforeEach(async () => {
    await Users.truncate({ cascade: true });
    await Posts.truncate({ cascade: true });
    await Comments.truncate({ cascade: true });
    createdUser = await helper.createUserAndLogin();
    createdPost = await helper.creatingPost(createdUser.token);
    createdComment = await helper.creatingComment(
      createdUser.token,
      createdPost.id
    );
  });
  test('updating a comment if authenticated', async () => {
    const updatedComment = {
      content: 'updated comment',
    };

    const commentAtStart = createdComment;

    await api
      .patch(`/api/comments/${createdComment.id}`)
      .set('Authorization', `Bearer ${createdUser.token}`)
      .send(updatedComment)
      .expect(204);

    const commentAtEnd = await helper.getComment(createdComment.id);

    expect(commentAtEnd.content).not.toBe(commentAtStart.content);
    expect(commentAtEnd.content).toBe(updatedComment.content);
  });

  test('error when updating a comment if not authenticated', async () => {
    const updatedComment = {
      content: 'updated comment',
    };

    const commentAtStart = createdComment;

    await api
      .patch(`/api/comments/${createdComment.id}`)
      .send(updatedComment)
      .expect(401);

    const commentAtEnd = await helper.getComment(createdComment.id);

    expect(commentAtEnd.content).toBe(commentAtStart.content);
    expect(commentAtEnd.content).not.toBe(updatedComment.content);
  });

  test('error when updating a comment if content is missing', async () => {
    const missingContent = {
      missing: 'updated comment',
    };

    const commentAtStart = createdComment;

    await api
      .patch(`/api/comments/${createdComment.id}`)
      .set('Authorization', `Bearer ${createdUser.token}`)
      .send(missingContent)
      .expect(400);

    const commentAtEnd = await helper.getComment(createdComment.id);

    expect(commentAtEnd.content).toBe(commentAtStart.content);
    expect(commentAtEnd.content).not.toBe(missingContent.content);
  });

  test('error when updating a comment if it is not yours', async () => {
    const secondUser = await helper.createUserAndLogin(
      'test',
      'testusername2',
      'testpassword2'
    );

    const attemptedUpdate = {
      content: 'will not update',
    };

    const commentAtStart = createdComment;

    await api
      .patch(`/api/comments/${createdComment.id}`)
      .set('Authorization', `Bearer ${secondUser.token}`)
      .send(attemptedUpdate)
      .expect(401);

    const commentAtEnd = await helper.getComment(createdComment.id);

    expect(commentAtEnd.content).toBe(commentAtStart.content);
    expect(commentAtEnd.content).not.toBe(attemptedUpdate.content);
  });
});

describe('deleting comments from the database', () => {
  let createdPost;
  let createdComment;
  let createdUser;

  beforeEach(async () => {
    await Users.truncate({ cascade: true });
    await Posts.truncate({ cascade: true });
    await Comments.truncate({ cascade: true });
    createdUser = await helper.createUserAndLogin();
    createdPost = await helper.creatingPost(createdUser.token);
    createdComment = await helper.creatingComment(
      createdUser.token,
      createdPost.id
    );
  });

  test('deleting a comment if authenticated', async () => {
    const secondComment = await helper.creatingComment(
      createdUser.token,
      createdPost.id
    );

    const commentsAtStart = await helper.getAllComments(createdPost.id);

    await api
      .delete(`/api/comments/${secondComment.id}`)
      .set('Authorization', `Bearer ${createdUser.token}`)
      .expect(204);

    const commentsAtEnd = await helper.getAllComments(createdPost.id);

    expect(commentsAtEnd).toHaveLength(commentsAtStart.length - 1);
  });

  test('error deleting a comment if not authenticated', async () => {
    const commentsAtStart = await helper.getAllComments(createdPost.id);

    await api.delete(`/api/comments/${createdComment.id}`).expect(401);

    const commentsAtEnd = await helper.getAllComments(createdPost.id);

    expect(commentsAtEnd).toHaveLength(commentsAtStart.length);
  });

  test('error deleting a comment that is not yours', async () => {
    const secondUser = await helper.createUserAndLogin(
      'test',
      'testusername2',
      'testpassword2'
    );

    const commentsAtStart = await helper.getAllComments(createdPost.id);

    await api
      .delete(`/api/comments/${createdComment.id}`)
      .set('Authorization', `Bearer ${secondUser.token}`)
      .expect(401);

    const commentsAtEnd = await helper.getAllComments(createdPost.id);

    expect(commentsAtEnd).toHaveLength(commentsAtStart.length);
  });
});
