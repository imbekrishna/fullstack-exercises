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
  const obj = _.chain(data)
    .countBy((item) => item?.author)
    .value();

  const author = _.maxBy(_.keys(obj), function (o) {
    return obj[o];
  });
  return {
    author: author,
    blogs: obj[author],
  };
};

const mostLikes = (blogs) => {
  var authors = _(blogs)
    .groupBy('author')
    .map((objs, key) => ({
      author: key,
      likes: _.sumBy(objs, 'likes'),
    }))
    .value();

  return _.maxBy(authors, (o) => o.likes);
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
