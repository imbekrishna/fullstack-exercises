const User = require('../models/user');
const app = require('../app');
const supertest = require('supertest');
const bcrypt = require('bcrypt');
const helper = require('./tests_helper');

const api = supertest(app);

beforeEach(async () => {
  await User.deleteMany({});
  const passwordHash = await bcrypt.hash('admin', 10);
  const user = new User({
    username: 'admin',
    name: 'admin',
    passwordHash: passwordHash,
  });

  await user.save();
});

describe('user creation', () => {
  test('should succeed with valid information', async () => {
    const initalUsers = await helper.usersInDb();

    const userinfo = {
      username: 'John',
      name: 'John Doe',
      password: 'somerandomstring',
    };

    await api
      .post('/api/users')
      .send(userinfo)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const newUsers = await helper.usersInDb();
    expect(newUsers).toHaveLength(initalUsers.length + 1);

    const usernames = newUsers.map((u) => u.username);

    expect(usernames).toContain(userinfo.username);
  });

  test('should fail with existing username', async () => {
    const initalUsers = await helper.usersInDb();

    const userinfo = {
      username: 'admin',
      name: 'John Doe',
      password: 'somerandomstring',
    };

    const result = await api
      .post('/api/users')
      .send(userinfo)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    expect(result.body.error).toContain('expected `username` to be unique');

    const newUsers = await helper.usersInDb();
    expect(newUsers).toEqual(initalUsers);
  });
  test('should fail without username', async () => {
    const initalUsers = await helper.usersInDb();

    const userinfo = {
      name: 'John Doe',
      password: 'somerandomstring',
    };

    const result = await api
      .post('/api/users')
      .send(userinfo)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    expect(result.body.error).toContain('Username/Password cannot be empty');

    const newUsers = await helper.usersInDb();
    expect(newUsers).toEqual(initalUsers);
  });

  test('should fail without password', async () => {
    const initalUsers = await helper.usersInDb();

    const userinfo = {
      username: 'admin',
      name: 'John Doe',
    };

    const result = await api
      .post('/api/users')
      .send(userinfo)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    expect(result.body.error).toContain('Username/Password cannot be empty');

    const newUsers = await helper.usersInDb();
    expect(newUsers).toEqual(initalUsers);
  });
  test('should fail with username less than 3 characters', async () => {
    const initalUsers = await helper.usersInDb();

    const userinfo = {
      username: 'ad',
      name: 'John Doe',
      password: 'secret'
    };

    const result = await api
      .post('/api/users')
      .send(userinfo)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    expect(result.body.error).toContain('Username/Password should have minimum length of 3');

    const newUsers = await helper.usersInDb();
    expect(newUsers).toEqual(initalUsers);
  });
  test('should fail with password less than 3 characters', async () => {
    const initalUsers = await helper.usersInDb();

    const userinfo = {
      username: 'admin',
      name: 'John Doe',
      password: 'pa'
    };

    const result = await api
      .post('/api/users')
      .send(userinfo)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    expect(result.body.error).toContain('Username/Password should have minimum length of 3');

    const newUsers = await helper.usersInDb();
    expect(newUsers).toEqual(initalUsers);
  });
});
