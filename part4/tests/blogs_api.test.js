const app = require('../app');
const mongoose = require('mongoose');
const supertest = require('supertest');
const helper = require('./tests_helper');
const Blog = require('../models/blog');
const User = require('../models/user');
const api = supertest(app);
const bcrypt = require('bcrypt');
const blog = require('../models/blog');

let bearerToken;

beforeEach(async () => {
  await Blog.deleteMany({});
  await User.deleteMany({});

  const passwordHash = await bcrypt.hash('admin', 10);
  const newUser = new User({
    name: 'admin',
    username: 'admin',
    passwordHash,
  });

  await newUser.save();

  const userBlogs = helper.initalBlogs.map((blog) => ({
    ...blog,
    user: newUser._id.toString(),
  }));

  await Blog.insertMany(userBlogs);

  const user = await api
    .post('/api/login')
    .send({ username: 'admin', password: 'admin' });

  bearerToken = user.body.token;
});

describe('Getting blog', () => {
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
});

describe('addition of a new blog', () => {
  test('should succeed with valid user and body', async () => {
    const initialBlogs = helper.initalBlogs;

    const newBlog = {
      title: 'This is third blog',
      author: 'imbekrishna',
      url: 'https://imbekrishna.github.io',
      likes: 3,
    };

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${bearerToken}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const finalBlogs = await helper.blogsInDb();

    const contents = finalBlogs.map((blog) => blog.title);

    expect(finalBlogs).toHaveLength(initialBlogs.length + 1);

    expect(contents).toContain('This is third blog');
  });

  test('should fail without title field', async () => {
    const blogWithoutTitle = {
      author: 'imbekrishna',
      url: 'https://imbekrishna.github.io',
    };

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${bearerToken}`)
      .send(blogWithoutTitle)
      .expect(400);

    const totalBlogs = await helper.blogsInDb();

    expect(totalBlogs).toHaveLength(helper.initalBlogs.length);
  });

  test('should fail without url field', async () => {
    const blogWithoutUrl = {
      title: 'A blog withour url',
      author: 'imbekrishna',
    };

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${bearerToken}`)
      .send(blogWithoutUrl)
      .expect(400);

    const totalBlogs = await helper.blogsInDb();

    expect(totalBlogs).toHaveLength(helper.initalBlogs.length);
  });
});
describe('deletion of a blog', () => {
  test('should delete blog with valid id', async () => {
    const initialBlogs = await helper.blogsInDb();

    const blogToDelete = initialBlogs[0];

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('Authorization', `Bearer ${bearerToken}`)
      .expect(204);

    const endBlogs = await helper.blogsInDb();

    expect(endBlogs).toHaveLength(helper.initalBlogs.length - 1);

    const contents = endBlogs.map((blog) => blog.title);

    expect(contents).not.toContain(blogToDelete.title);
  });

  test('should return 400 on deleting blog with invalid Id', async () => {
    const invalidId = 'dfsada790dfa34jkd';

    const result = await api
      .delete(`/api/blogs/${invalidId}`)
      .set('Authorization', `Bearer ${bearerToken}`)
      .expect(400);

    expect(result.body.error).toContain('malformatted id');
  });
});

describe('Updation of a blog', () => {
  test('should succeed with valid id and valid user', async () => {
    const initialBlogs = await helper.blogsInDb();
    const { id, author, title, url } = initialBlogs[0];

    const updatedBody = {
      author,
      title,
      url,
      likes: 100,
    };

    const updatedBlog = await api
      .put(`/api/blogs/${id}`)
      .set('Authorization', `Bearer ${bearerToken}`)
      .send(updatedBody)
      .expect(201);

    const endBlogs = await helper.blogsInDb();

    expect(endBlogs).toHaveLength(helper.initalBlogs.length);

    const likesArray = endBlogs.map((blog) => blog.likes);

    expect(likesArray).toContain(updatedBlog.body.likes);
  });
  test('should fail with valid id and invalid token', async () => {
    const initialBlogs = await helper.blogsInDb();
    const { id, author, title, url } = initialBlogs[0];

    const updatedBody = {
      author,
      title,
      url,
      likes: 100,
    };

    const result = await api
      .put(`/api/blogs/${id}`)
      .set('Authorization', `Bearer ${bearerToken}12`)
      .send(updatedBody)
      .expect(401)
      .expect('Content-Type', /application\/json/);

    const endBlogs = await helper.blogsInDb();
    expect(endBlogs).toEqual(initialBlogs);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
