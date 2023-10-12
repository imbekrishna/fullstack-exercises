const app = require('../app');
const mongoose = require('mongoose');
const supertest = require('supertest');
const helper = require('./tests_helper');
const Blog = require('../models/blog');
const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});

  const blogObjects = helper.initalBlogs.map((blog) => new Blog(blog));
  const promiseArray = blogObjects.map((blog) => blog.save());
  await Promise.all(promiseArray);
});

test('should fetch all the blogs in json format', async () => {
  const respone = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/);

  expect(respone.body).toHaveLength(helper.initalBlogs.length);
});

test('should have id as primary identifier', async () => {
  const response = await api.get('/api/blogs');

  expect(response.body[0].id).toBeDefined();
});

test('should add new blog to database', async () => {
  const initialBlogs = helper.initalBlogs;

  const newBlog = {
    title: 'This is third blog',
    author: 'imbekrishna',
    url: 'https://imbekrishna.github.io',
    likes: 3,
  };

  await api.post('/api/blogs').send(newBlog).expect(201);

  const finalBlogs = await helper.blogsInDb();

  const contents = finalBlogs.map((blog) => blog.title);

  expect(finalBlogs).toHaveLength(initialBlogs.length + 1);

  expect(contents).toContain('This is third blog');
});

test('should not add blog without title field', async () => {
  const blogWithoutTitle = {
    author: 'imbekrishna',
    url: 'https://imbekrishna.github.io',
  };

  await api.post('/api/blogs').send(blogWithoutTitle).expect(400);

  const totalBlogs = await helper.blogsInDb();

  expect(totalBlogs).toHaveLength(helper.initalBlogs.length);
});

test('should not add blog without url field', async () => {
  const blogWithoutUrl = {
    title: 'A blog withour url',
    author: 'imbekrishna',
  };

  await api.post('/api/blogs').send(blogWithoutUrl).expect(400);

  const totalBlogs = await helper.blogsInDb();

  expect(totalBlogs).toHaveLength(helper.initalBlogs.length);
});

afterAll(() => {
  mongoose.connection.close();
});
