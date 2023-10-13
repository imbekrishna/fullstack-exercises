const userRouter = require('express').Router();
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

userRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body;

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