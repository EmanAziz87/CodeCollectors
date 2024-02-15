require('dotenv').config();
const supertest = require('supertest');
const app = require('../app');
const jwt = require('jsonwebtoken');
const Users = require('../models/Users');

const api = supertest(app);

describe('authenticating', () => {
  let user;

  const newUser = {
    name: 'test',
    username: 'testusername',
    password: 'testpassword',
  };

  beforeEach(async () => {
    await Users.truncate({ cascade: true });
    const userResponse = await api
      .post('/api/users')
      .send(newUser)
      .expect('Content-Type', /application\/json/)
      .expect(201);

    user = userResponse.body;
  });

  test('login with user credentials and receive valid token', async () => {
    const response = await api
      .post('/api/login')
      .send({ username: newUser.username, password: newUser.password })
      .expect('Content-Type', /application\/json/)
      .expect(200);

    const { token } = response.body;

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    expect(decodedToken.id).toBe(user.id);
  });
});
