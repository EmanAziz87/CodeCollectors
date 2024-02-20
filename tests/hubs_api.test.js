const supertest = require('supertest');
const app = require('../app');
const Hubs = require('../models/Hubs');
const Users = require('../models/Users');
const {
  createUserAndLogin,
  getAllHubs,
  getHub,
  getUser,
  hubs,
} = require('./testHelper');

const api = supertest(app);

describe('getting hubs from the database', () => {
  beforeEach(async () => {
    await Hubs.sync({ force: true });
    await Hubs.truncate({ cascade: true });
    await Hubs.bulkCreate(hubs);
  });

  test('getting all hubs', async () => {
    const hubsAtStart = await getAllHubs();

    const response = await api
      .get('/api/hubs')
      .expect('Content-Type', /application\/json/)
      .expect(200);

    const responseHubs = response.body;

    expect(responseHubs).toHaveLength(hubsAtStart.length);
  });

  test('getting a specifc hub', async () => {
    const hubs = await getAllHubs();

    const response = await api
      .get(`/api/hubs/${hubs[0].id}`)
      .expect('Content-Type', /application\/json/)
      .expect(200);

    const responseHub = response.body;

    expect(hubs[0]).toEqual(responseHub);
  });
});

describe('updating hubs in the database', () => {
  beforeEach(async () => {
    await Users.truncate({ cascade: true });
    await Hubs.truncate({ cascade: true });
    await Hubs.bulkCreate(hubs);
  });

  test('when logged in, subscribing increases hub sub count and adds it to user instance', async () => {
    const { user, token } = await createUserAndLogin(
      'test',
      'testusername',
      'testpassword'
    );

    const allHubs = await getAllHubs();

    const userPreSubscribe = await getUser(user.id);
    const hubPreSubIncrease = allHubs[0];

    await api
      .patch(`/api/hubs/${hubPreSubIncrease.id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(204);

    const hubPostSubIncrease = await getHub(hubPreSubIncrease.id);
    const userPostSubscribe = await getUser(user.id);

    expect(userPostSubscribe.subscribedHubs).toHaveLength(
      userPreSubscribe.subscribedHubs.length + 1
    );

    expect(userPostSubscribe.subscribedHubs).toContain(hubPostSubIncrease.name);

    expect(hubPostSubIncrease.subscribers).toBe(
      hubPreSubIncrease.subscribers + 1
    );
  });

  test('if already subscribed, unsubscribe', async () => {
    const { user, token } = await createUserAndLogin(
      'test',
      'testusername',
      'testpassword'
    );

    const allHubs = await getAllHubs();

    const userPreSubscribe = await getUser(user.id);
    const hubPreSubIncrease = allHubs[0];

    await api
      .patch(`/api/hubs/${hubPreSubIncrease.id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(204);

    await api
      .patch(`/api/hubs/${hubPreSubIncrease.id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(204);

    const hubPostSubIncrease = await getHub(hubPreSubIncrease.id);
    const userPostSubscribe = await getUser(user.id);

    expect(userPostSubscribe.subscribedHubs).toHaveLength(
      userPreSubscribe.subscribedHubs.length
    );

    expect(userPostSubscribe.subscribedHubs).not.toContain(
      hubPostSubIncrease.name
    );

    expect(hubPostSubIncrease.subscribers).toBe(hubPreSubIncrease.subscribers);
  });
  test('cannot subscribe to a hub if your not logged in', async () => {
    const allHubs = await getAllHubs();

    const hubPreSubIncrease = allHubs[0];

    await api.patch(`/api/hubs/${hubPreSubIncrease.id}`).expect(401);

    const hubPostSubIncrease = await getHub(hubPreSubIncrease.id);

    expect(hubPostSubIncrease.subscribers).toBe(hubPreSubIncrease.subscribers);
  });
});
