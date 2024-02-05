const app = require('../app');
const supertest = require('supertest');
const Users = require('../models/Users');
const helper = require('./testHelper');

const api = supertest(app);

beforeEach(async () => {
  await Users.sync({ force: true });
  await Users.truncate();
  await Users.create({
    name: 'tim',
    username: 'timmy',
    password: 'testpassword',
  });
});

describe('when the database has one user', () => {
  test('if inputs are valid, add user to database', async () => {
    const usersAtStart = await helper.getAllUsers();

    const newUser = {
      name: 'jim',
      username: 'jim467',
      password: 'password',
    };

    const response = await api
      .post('/api/users')
      .send(newUser)
      .expect('Content-Type', /application\/json/)
      .expect(201);

    const responseBody = response.body;

    const usersAtEnd = await helper.getAllUsers();

    const createdUserInDB = usersAtEnd.find(
      (user) => user.username === newUser.username
    );

    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);
    expect(responseBody).toEqual(createdUserInDB);
  });

  test('if password and username are less than 4 characters throw 400 error', async () => {
    const usersAtStart = await helper.getAllUsers();

    const tooShort = {
      name: 'jim',
      username: 'jim',
      password: '123',
    };

    const usersAtEnd = await helper.getAllUsers();

    await api.post('/api/users').send(tooShort).expect(400);
    expect(usersAtEnd).toHaveLength(usersAtStart.length);
  });
});
