const config = require('./utils/config');
const logger = require('./utils/logger');
const express = require('express');
require('express-async-errors')
const app = express();
const cors = require('cors');
const blogsRouter = require('./controllers/blogs');
const mongoose = require('mongoose');

logger.info('connecting to', config.MONGODB_URI);

mongoose
  .connect(config.MONGODB_URI)
  .then(() => logger.info('connected to MongoDB'))
  .catch((error) => logger.error(error));

app.use(cors());
app.use(express.json());

app.use('/api/blogs', blogsRouter);

module.exports = app;
