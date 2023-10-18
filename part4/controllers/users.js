const userRouter = require('express').Router();
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

userRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs', {
    url: 1,
    title: 1,
    author: 1,
    id: 1,
  });
  response.json(users);
});

userRouter.get('/summary', async (request, response) => {
  const result = await User.aggregate([
    {
      $project: {
        _id: 1,
        name: 1,
        blogCount: { $size: '$blogs' },
      },
    },
  ]).sort({ blogCount: -1 });

  response.json(result);
});

userRouter.get('/:id', async (request, response) => {
  const id = request.params.id;
  const user = await User.findById(id).populate('blogs', {
    url: 1,
    title: 1,
    author: 1,
    id: 1,
  });
  response.json({ name: user.name, blogs: user.blogs });
});

userRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body;

  if (!username || !password) {
    return response
      .status(400)
      .json({ error: 'Username/Password cannot be empty' });
  } else if (username.length < 3 || password.length < 3) {
    return response
      .status(400)
      .json({ error: 'Username/Password should have minimum length of 3' });
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const newUser = new User({
    username,
    name,
    passwordHash,
  });

  const user = await newUser.save();

  response.status(201).json(user);
});

module.exports = userRouter;
