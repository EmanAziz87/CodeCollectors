const app = require('../app');
const supertest = require('supertest');
const Users = require('../models/Users');
const helper = require('./testHelper');

const api = supertest(app);

describe('when the database has one user', () => {
  beforeEach(async () => {
    await Users.sync({ force: true });
    await Users.truncate();
    await Users.create({
      name: 'tim',
      username: 'timmy',
      password: 'testpassword',
    });
  });
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

  test('if username, password, or name is missing, throw a 400 error', async () => {
    const usersAtStart = await helper.getAllUsers();

    const missingUsername = {
      name: 'invalid',
      password: 'invalid',
    };

    await api.post('/api/users').send(missingUsername).expect(400);

    const missingPassword = {
      name: 'invalid',
      username: 'invalid',
    };

    await api.post('/api/users').send(missingPassword).expect(400);

    const missingName = {
      username: 'invalid',
      password: 'invalid',
    };

    await api.post('/api/users').send(missingName).expect(400);

    const usersAtEnd = await helper.getAllUsers();

    expect(usersAtEnd).toHaveLength(usersAtStart.length);
  });

  test('delete user if authenticated as that user', async () => {
    const usersAtStart = await helper.getAllUsers();

    const { user, token } = await helper.createUserAndLogin();

    await api
      .delete(`/api/users/${user.id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(204);

    const usersAtEnd = await helper.getAllUsers();
    expect(usersAtEnd).toHaveLength(usersAtStart.length);
  });

  test('error if an attempt to delete a user that is not yours', async () => {
    const firstUser = await helper.createUserAndLogin(
      'test',
      'testusername',
      'testpassword'
    );

    const secondUser = await helper.createUserAndLogin(
      'test2',
      'testusername2',
      'testpassword2'
    );

    const usersAtStart = await helper.getAllUsers();

    await api
      .delete(`/api/users/${firstUser.user.id}`)
      .set('Authorization', `Bearer ${secondUser.token}`)
      .expect(401);

    const usersAtEnd = await helper.getAllUsers();

    expect(usersAtEnd).toHaveLength(usersAtStart.length);
  });
});

describe('when the database has multiple users', () => {
  beforeEach(async () => {
    await Users.sync({ force: true });
    await Users.truncate();
    await Users.bulkCreate([
      {
        name: 'tim',
        username: 'timmy',
        password: 'testpassword',
      },
      {
        name: 'jim',
        username: 'jimmy',
        password: 'testpassword2',
      },
      {
        name: 'kim',
        username: 'kimmy',
        password: 'testpassword3',
      },
    ]);
  });

  test('get all users from the database', async () => {
    const usersAtStart = await helper.getAllUsers();

    const response = await api
      .get('/api/users')
      .expect(200)
      .expect('Content-Type', /application\/json/);

    const allUsers = response.body;

    expect(allUsers).toHaveLength(usersAtStart.length);
  });

  test('get a specific user from the database', async () => {
    const allUsers = await helper.getAllUsers();
    const removedPassword = allUsers.map((user) => {
      return {
        id: user.id,
        name: user.name,
        subscribedHubs: user.subscribedHubs,
        username: user.username,
      };
    });

    const response = await api
      .get(`/api/users/${removedPassword[0].id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/);

    const retrievedUser = response.body;

    expect(retrievedUser).toEqual(removedPassword[0]);
  });
});
