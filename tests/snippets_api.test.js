const supertest = require('supertest');
const app = require('../app');
const {
  createUserAndLogin,
  snippets,
  getAllSnippets,
  oneSnippet,
  getSnippet,
  creatingSnippet,
} = require('./testHelper');
const Snippets = require('../models/Snippets');
const Users = require('../models/Users');

const api = supertest(app);

describe('getting snippets', () => {
  beforeEach(async () => {
    await Snippets.truncate({ cascade: true });
    await Snippets.bulkCreate(snippets);
  });
  test('getting all snippets from database', async () => {
    const snippetsAtStart = await getAllSnippets();

    const response = await api
      .get('/api/snippets')
      .expect('Content-Type', /application\/json/)
      .expect(200);

    const snippetsFromApi = response.body;

    expect(snippetsAtStart).toHaveLength(snippetsFromApi.length);
  });
});

describe('creating snippets', () => {
  beforeEach(async () => {
    await Users.truncate({ cascade: true });
    await Snippets.truncate({ cascade: true });
    await Snippets.bulkCreate(snippets);
  });
  test('when authenticated can create a snippet', async () => {
    const snippetsAtStart = await getAllSnippets();
    const { user, token } = await createUserAndLogin();

    const response = await api
      .post('/api/snippets')
      .set('Authorization', `Bearer ${token}`)
      .send(oneSnippet)
      .expect('Content-Type', /application\/json/)
      .expect(201);

    const createdSnippet = response.body;
    const createdSnippetDb = await getSnippet(createdSnippet.id);

    const snippetsAtEnd = await getAllSnippets();

    expect(createdSnippetDb.userId).toBe(user.id);
    expect(snippetsAtEnd).toHaveLength(snippetsAtStart.length + 1);
  });
  test('error when creating an empty snippet', async () => {
    const snippetsAtStart = await getAllSnippets();

    const { token } = await createUserAndLogin();

    const missingContent = {
      title: 'where is the content',
    };

    await api
      .post('/api/snippets')
      .set('Authorization', `Bearer ${token}`)
      .send(missingContent)
      .expect(400);

    const snippetsAtEnd = await getAllSnippets();

    expect(snippetsAtEnd).toHaveLength(snippetsAtStart.length);
  });
  test('error when creating a snippet and not authenticated', async () => {
    const snippetsAtStart = await getAllSnippets();

    await api.post('/api/snippets').send(oneSnippet).expect(401);

    const snippetsAtEnd = await getAllSnippets();

    expect(snippetsAtEnd).toHaveLength(snippetsAtStart.length);
  });
});

describe('updating snippets', () => {
  beforeEach(async () => {
    await Users.truncate({ cascade: true });
    await Snippets.truncate({ cascade: true });
    await Snippets.bulkCreate(snippets);
  });

  test('when authenticated can update snippet', async () => {
    const { token } = await createUserAndLogin();
    const createdSnippet = await creatingSnippet(token);

    const snippetsAtStart = await getAllSnippets();

    const updatedContent = {
      content: 'this was updated for a test',
    };

    await api
      .patch(`/api/snippets/${createdSnippet.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send(updatedContent)
      .expect(204);

    const updatedSnippet = await getSnippet(createdSnippet.id);
    const snippetsAtEnd = await getAllSnippets();

    expect(updatedSnippet.content).not.toBe(createdSnippet.content);
    expect(updatedSnippet.content).toBe(updatedContent.content);
    expect(snippetsAtEnd).toHaveLength(snippetsAtStart.length);
  });
  test('error updating snippet when not authenticated', async () => {
    const { token } = await createUserAndLogin();
    const createdSnippet = await creatingSnippet(token);

    const updatedContent = {
      content: 'this update will fail',
    };

    await api
      .patch(`/api/snippets/${createdSnippet.id}`)
      .send(updatedContent)
      .expect(401);

    const notUpdatedSnippet = await getSnippet(createdSnippet.id);

    expect(notUpdatedSnippet.content).toBe(createdSnippet.content);
    expect(notUpdatedSnippet.content).not.toBe(updatedContent.content);
  });
  test('error updating snippet with no content', async () => {
    const { token } = await createUserAndLogin();
    const createdSnippet = await creatingSnippet(token);

    const missingContent = {
      missing: 'missing content',
    };

    await api
      .patch(`/api/snippets/${createdSnippet.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send(missingContent)
      .expect(400);

    const notUpdatedSnippet = await getSnippet(createdSnippet.id);
    expect(notUpdatedSnippet.content).toBe(createdSnippet.content);
  });
  test('error updating snippet when unauthorized to do so', async () => {
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

    const firstUsersSnippet = await creatingSnippet(firstUser.token);

    const updatedContent = {
      content: 'this was updated for a test',
    };

    await api
      .patch(`/api/snippets/${firstUsersSnippet.id}`)
      .set('Authorization', `Bearer ${secondUser.token}`)
      .send(updatedContent)
      .expect(401);

    const notUpdatedSnippet = await getSnippet(firstUsersSnippet.id);

    expect(notUpdatedSnippet.content).toBe(firstUsersSnippet.content);
    expect(notUpdatedSnippet.content).not.toBe(updatedContent.content);
  });
});

describe('deleting snippets', () => {
  beforeEach(async () => {
    await Users.truncate({ cascade: true });
    await Snippets.truncate({ cascade: true });
    await Snippets.bulkCreate(snippets);
  });

  test('when authenticated you can delete a snippet', async () => {
    const { token } = await createUserAndLogin();
    const createdSnippet = await creatingSnippet(token);

    const snippetsAtStart = await getAllSnippets();

    await api
      .delete(`/api/snippets/${createdSnippet.id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(204);

    const snippetsAtEnd = await getAllSnippets();

    expect(snippetsAtEnd).toHaveLength(snippetsAtStart.length - 1);
  });
  test('error deleting snippet when not authenticated', async () => {
    const { token } = await createUserAndLogin();
    const createdSnippet = await creatingSnippet(token);

    const snippetsAtStart = await getAllSnippets();

    await api.delete(`/api/snippets/${createdSnippet.id}`).expect(401);

    const snippetsAtEnd = await getAllSnippets();

    expect(snippetsAtEnd).toHaveLength(snippetsAtStart.length);
  });
  test('error deleting snippet not associated with your account', async () => {
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

    const firstUsersSnippet = await creatingSnippet(firstUser.token);

    const snippetsAtStart = await getAllSnippets();

    await api
      .delete(`/api/snippets/${firstUsersSnippet.id}`)
      .set('Authorization', `Bearer ${secondUser.token}`)
      .expect(401);

    const snippetsAtEnd = await getAllSnippets();

    expect(snippetsAtEnd).toHaveLength(snippetsAtStart.length);
  });
});
