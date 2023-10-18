const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const Comment = require('../models/comments');

const populateField = [
  { path: 'user', select: ['username', 'name', 'id'] },
  { path: 'comments', select: ['body', 'id'] },
];

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate(populateField);
  response.json(blogs);
});
blogsRouter.get('/:id', async (request, response) => {
  const blogs = await Blog.findById(request.params.id).populate(populateField);
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

blogsRouter.post('/:id/comments', async (request, response) => {
  const body = request.body;
  const user = request.user;

  const blog = await Blog.findById(request.params.id);

  const comment = new Comment({
    ...body,
    blog: request.params.id,
  });
  const result = await comment.save();

  user.comments = user.comments.concat(result._id);
  await user.save();

  blog.comments = blog.comments.concat(result._id);
  const updated = await Blog.populate(blog, populateField);

  response.status(201).json(updated);
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
