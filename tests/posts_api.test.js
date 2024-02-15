const supertest = require('supertest');
const app = require('../app');
const Posts = require('../models/Posts');
const Users = require('../models/Users');
const {
  createUserAndLogin,
  creatingPost,
  getAllPosts,
  getAPost,
  posts,
  getAllHubs,
} = require('./testHelper');

const api = supertest(app);

describe('When the database has posts', () => {
  beforeEach(async () => {
    await Posts.truncate({ cascade: true });
    await Posts.bulkCreate(posts);
  });

  test('grabbing all posts from the database', async () => {
    const postsAtStart = await getAllPosts();

    const response = await api
      .get('/api/posts')
      .expect('Content-Type', /application\/json/)
      .expect(200);

    const postsFromCall = response.body;

    expect(postsAtStart).toHaveLength(postsFromCall.length);
  });

  test('getting a specific post from the database', async () => {
    const posts = await getAllPosts();
    const response = await api.get(`/api/posts/${posts[0].id}`).expect(200);
    const postFromCall = response.body;
    expect(posts[0]).toEqual(postFromCall);
  });
});

describe('creating posts in the database', () => {
  beforeEach(async () => {
    await Users.truncate({ cascade: true });
    await Posts.truncate({ cascade: true });
  });

  test('authenticate as a valid user than create a post', async () => {
    const postsAtStart = await getAllPosts();
    const hubs = await getAllHubs();

    const { user, token } = await createUserAndLogin(
      'test',
      'testusername',
      'testpassword'
    );

    const newSnippet = {
      title: 'test',
      content: 'test',
      language: 'Java',
    };

    const snippetResponse = await api
      .post('/api/snippets')
      .set('Authorization', `Bearer ${token}`)
      .send(newSnippet)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const createdSnippet = snippetResponse.body;

    const newPost = {
      title: 'test',
      author: 'test',
      content: 'test',
      hubId: hubs[0].id,
      snippetId: createdSnippet.id,
    };

    const postCall = await api
      .post('/api/posts')
      .set('Authorization', `Bearer ${token}`)
      .send(newPost)
      .expect('Content-Type', /application\/json/)
      .expect(201);

    const createdPost = postCall.body;
    const postsAtEnd = await getAllPosts();

    const findCreatedPost = postsAtEnd.find(
      (post) => post.id === createdPost.id
    );

    expect(user.id).toBe(findCreatedPost.userId);
    expect(postsAtEnd).toHaveLength(postsAtStart.length + 1);
  });

  test('throws error if you attempt to create a post while not logged in', async () => {
    const postsAtStart = await getAllPosts();

    const newPost = {
      title: 'testtitle',
      author: 'testauthor',
      content: 'testauthor',
    };

    await api
      .post('/api/posts')
      .send(newPost)
      .expect('Content-Type', /application\/json/)
      .expect(401);

    const postsAtEnd = await getAllPosts();
    expect(postsAtEnd).toHaveLength(postsAtStart.length);
  });

  test('throws error if you attempt to create a post with missing submission info', async () => {
    const postsAtStart = await getAllPosts();
    const { token } = await createUserAndLogin(
      'test',
      'testusername',
      'testpassword'
    );

    const missingContent = {
      title: 'testtitle',
      author: 'testauthor',
    };

    await api
      .post('/api/posts')
      .set('Authorization', `Bearer ${token}`)
      .send(missingContent)
      .expect('Content-Type', /application\/json/)
      .expect(400);

    const postsAtEnd = await getAllPosts();
    expect(postsAtEnd).toHaveLength(postsAtStart.length);
  });
});

describe('updating posts in the database', () => {
  beforeEach(async () => {
    await Users.truncate({ cascade: true });
    await Posts.truncate({ cascade: true });
  });
  test('update a post if you are the creator of the post', async () => {
    const { token } = await createUserAndLogin(
      'test',
      'testusername',
      'testpassword'
    );

    const newContent = 'updated content';

    const createdPost = await creatingPost(token);

    const updateContent = { ...createdPost, content: newContent };

    await api
      .patch(`/api/posts/${createdPost.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send(updateContent)
      .expect(204);

    const updatedPost = await getAPost(createdPost.id);

    expect(updatedPost.content).not.toBe(createdPost.content);
    expect(updatedPost.content).toBe(newContent);
  });

  test('throws error if you attempt to update a post when you are not logged in', async () => {
    const { token } = await createUserAndLogin(
      'test',
      'testusername',
      'testpassword'
    );

    const newContent = 'updated content';

    const createdPost = await creatingPost(token);

    const updatePost = { ...createdPost, content: newContent };

    await api
      .patch(`/api/posts/${createdPost.id}`)
      .send(updatePost)
      .expect(401);

    const notUpdatedPost = await getAPost(createdPost.id);

    expect(notUpdatedPost.content).toBe(createdPost.content);
  });

  test('throws error when logged in but update submission info is missing', async () => {
    const { token } = await createUserAndLogin(
      'test',
      'testusername',
      'testpassword'
    );

    const missingContent = {
      missing: 'content missing',
    };

    const createdPost = await creatingPost(token);

    await api
      .patch(`/api/posts/${createdPost.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send(missingContent)
      .expect(400);

    const notUpdatedPost = await getAPost(createdPost.id);

    expect(notUpdatedPost.content).toBe(createdPost.content);
  });

  test('throws error if logged in and try to update post that is not yours', async () => {
    const firstUser = await createUserAndLogin(
      'test',
      'testusername',
      'testpassword'
    );

    const secondUser = await createUserAndLogin(
      'test2',
      'testusername2',
      'testpassword2'
    );

    const secondUsersContent = 'updatedcontent';

    const firstUserCreatedPost = await creatingPost(firstUser.token);

    const updatePost = { ...firstUserCreatedPost, content: secondUsersContent };

    await api
      .patch(`/api/posts/${firstUserCreatedPost.id}`)
      .set('Authorization', `Bearer ${secondUser.token}`)
      .send(updatePost)
      .expect(401);

    const notUpdatedPost = await getAPost(firstUserCreatedPost.id);

    expect(notUpdatedPost.content).toBe(firstUserCreatedPost.content);
  });
});

describe('deleting posts in the database', () => {
  beforeEach(async () => {
    await Users.truncate({ cascade: true });
    await Posts.truncate({ cascade: true });
  });

  test('deleting posts when you are logged in and it is your post', async () => {
    const postsAtStart = await getAllPosts();

    const { token } = await createUserAndLogin(
      'test',
      'testusername',
      'testpassword'
    );

    const createdPost = await creatingPost(token);

    await api
      .delete(`/api/posts/${createdPost.id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(204);

    const postsAtEnd = await getAllPosts();
    expect(postsAtEnd).toHaveLength(postsAtStart.length);
  });

  test('throw error when when you try to delete a post when your not logged in', async () => {
    const postsAtStart = await getAllPosts();

    const { token } = await createUserAndLogin(
      'test',
      'testusername',
      'testpassword'
    );

    const createdPost = await creatingPost(token);

    await api.delete(`/api/posts/${createdPost.id}`).expect(401);

    const postsAtEnd = await getAllPosts();
    expect(postsAtEnd).toHaveLength(postsAtStart.length + 1);
  });

  test('throw error when when you try to delete a post that is not yours', async () => {
    const postsAtStart = await getAllPosts();

    const firstUser = await createUserAndLogin(
      'test',
      'testusername',
      'testpassword'
    );

    const secondUser = await createUserAndLogin(
      'test2',
      'testusername2',
      'testpassword2'
    );

    const firstUserPost = await creatingPost(firstUser.token);

    await api
      .delete(`/api/posts/${firstUserPost.id}`)
      .set('Authorization', `Bearer ${secondUser.token}`)
      .expect(401);

    const postsAtEnd = await getAllPosts();

    expect(postsAtEnd).toHaveLength(postsAtStart.length + 1);
  });
});
