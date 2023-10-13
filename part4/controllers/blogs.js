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

blogsRouter.post('/', async (request, response) => {
  const body = request.body;

  const currUser = jwt.verify(request.token, process.env.SECRET);

  if (!currUser.id) {
    return response.status(401).json({ error: 'invalid token' });
  }

  const user = await User.findById(currUser.id);

  const blog = new Blog({
    ...body,
    user: user.id,
  });

  const result = await blog.save();
  user.blogs = user.blogs.concat(result._id);
  await user.save();
  response.status(201).json(result);
});

blogsRouter.delete('/:id', async (request, response) => {
  const body = request.body;

  const currUser = jwt.verify(request.token, process.env.SECRET);

  if (!currUser.id) {
    return response.status(401).json({ error: 'invalid token' });
  }

  const blog = await Blog.findById(request.params.id);

  if (!blog) {
    return response.status(404).json({ error: 'blog not found' });
  }

  if (blog.user.toString() !== currUser.id.toString()) {
    return response.status(401).json({ error: 'invalid user' });
  }

  await Blog.findByIdAndDelete(blog.id);
  response.status(204).end();
});

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body;

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  };

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
    new: true,
    runValidators: true,
  });

  response.status(201).json(updatedBlog);
});

module.exports = blogsRouter;
