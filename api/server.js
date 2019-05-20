const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');
const authsRouter = require('../auth/auths-router.js');
const usersRouter = require('../ressources/users/users-router.js');
const postsRouter = require('../ressources/posts/posts-router.js');
const commentsRouter = require('../ressources/comments/comments-router.js');

const server = express();

// Global middlewares
server.use(express.json());
server.use(helmet());
server.use(morgan('dev'));
server.use(cors());

// Route middlewares
server.use('/api/auth', authsRouter);
server.use('/api/users', usersRouter);
server.use('/api/posts', postsRouter);
server.use('/api/comments', commentsRouter);

server.get('/', async (req, res) => {
  try {
    res.status(200).json({Welcome_to: 'Bubl'});
  } catch (e) {
    console.log(e.message);
    res.status(500).json({errorMessage: 'Server error!'});
  }
});

module.exports = server;
