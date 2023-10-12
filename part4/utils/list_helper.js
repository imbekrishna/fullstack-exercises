const _ = require('lodash');

const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  const reducer = (sum, item) => {
    return sum + item.likes;
  };

  return blogs.reduce(reducer, 0);
};

const favoriteBlog = (blogs) => {
  const favorite = blogs.reduce((prev, current) => {
    return prev && prev.likes > current.likes ? prev : current;
  });

  return {
    title: favorite.title,
    author: favorite.author,
    likes: favorite.likes,
  };
};

const mostBlogs = (data) => {
  const authorCounts = _.countBy(data, 'author');

  const authorWithMostBlogs = _.maxBy(
    _.keys(authorCounts),
    (author) => authorCounts[author]
  );

  return {
    author: authorWithMostBlogs,
    blogs: authorCounts[authorWithMostBlogs] || 0,
  };
};

const mostLikes = (blogs) => {
  const authorLikes = _.chain(blogs)
    .groupBy('author')
    .map((objs, author) => ({ author, likes: _.sumBy(objs, 'likes') }))
    .value();

  return _.maxBy(authorLikes, 'likes');
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
