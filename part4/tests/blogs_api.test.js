const app = require('../app');
const mongoose = require('mongoose');
const Blog = require('../models/blog');
const supertest = require('supertest');

const api = supertest(app);

test('should fetch all the blogs in json format', async () => {
  const respone = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/);

  expect(respone.body).toHaveLength(2);
});

test('should have id as primary identifier', async () => {
  const response = await api.get('/api/blogs');

  expect(response.body[0].id).toBeDefined();
});

afterAll(() => {
  mongoose.connection.close();
});
