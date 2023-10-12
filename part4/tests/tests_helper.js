const Blog = require('../models/blog');

const initalBlogs = [
  {
    title: 'This is first blog',
    author: 'imbekrishna',
    url: 'https://imbekrishna.github.io',
    likes: 1,
  },
  {
    title: 'This is second blog',
    author: 'imbekrishna',
    url: 'https://imbekrishna.github.io',
    likes: 2,
  },
];

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

module.exports = {
  initalBlogs,
  blogsInDb,
};
