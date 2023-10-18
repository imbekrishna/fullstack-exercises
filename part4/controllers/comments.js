const commentsRouter = require('express').Router();
const Comment = require('../models/comments');
const Blog = require('../models/blog');

const populateFields = [{ path: 'blog', select: ['title', 'id'] }];

commentsRouter.get('/', async (request, response) => {
  const comments = await Comment.find({}).populate(populateFields);
  response.json(comments);
});
commentsRouter.get('/:id', async (request, response) => {
  const comment = await Comment.findById(request.params.id).populate(
    populateFields
  );
  response.json(comment);
});

module.exports = commentsRouter;
