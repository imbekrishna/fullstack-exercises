const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', {
    username: 1,
    name: 1,
    id: 1,
  });
  response.json(blogs);
});
blogsRouter.get('/:id', async (request, response) => {
  const blogs = await Blog.findById(request.params.id).populate('user', {
    username: 1,
    name: 1,
    id: 1,
  });
  response.json(blogs);
});

blogsRouter.post('/', async (request, response) => {
  const body = request.body;

  const user = request.user;

  const blog = new Blog({
    ...body,
    user: user.id,
  });

  const result = await blog.save();
  user.blogs = user.blogs.concat(result._id);
  await user.save();

  const savedBlog = await Blog.findById(result._id).populate('user', {
    username: 1,
    name: 1,
    id: 1,
  });

  response.status(201).json(savedBlog);
});

blogsRouter.delete('/:id', async (request, response) => {
  const body = request.body;

  const user = request.user;

  const blog = await Blog.findById(request.params.id);

  if (!blog) {
    return response.status(404).json({ error: 'blog not found' });
  }

  if (blog.user.toString() !== user.id.toString()) {
    return response.status(401).json({ error: 'invalid user' });
  }

  await Blog.findByIdAndDelete(blog.id);
  response.status(204).end();
});

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body;

  const user = request.user;

  const blog = await Blog.findById(request.params.id);

  if (!blog) {
    return response.status(404).json({ error: 'blog not found' });
  }

  if (blog.user.toString() !== user.id.toString()) {
    return response.status(401).json({ error: 'invalid user' });
  }

  const updatedBlogBody = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  };

  const updatedBlog = await Blog.findByIdAndUpdate(
    request.params.id,
    updatedBlogBody,
    {
      new: true,
      runValidators: true,
    }
  ).populate('user', {
    username: 1,
    name: 1,
    id: 1,
  });

  response.status(201).json(updatedBlog);
});

blogsRouter.post('/like/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id).populate('user', {
    username: 1,
    name: 1,
    id: 1,
  });
  blog.likes = blog.likes + 1;
  blog.save();

  response.status(201).json(blog);
});

module.exports = blogsRouter;
