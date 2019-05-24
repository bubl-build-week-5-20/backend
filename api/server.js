const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');
const authsRouter = require('../auth/auths-router.js');
const usersRouter = require('../ressources/users/users-router.js');
const postsRouter = require('../ressources/posts/posts-router.js');
const bublsPostRouter = require('../ressources/posts/bubl-post-router.js');
const postsCommentRouter = require('../ressources/posts/post-comment-router.js');
const commentsRouter = require('../ressources/comments/comments-router.js');
const schoolsRouter = require('../ressources/schools/schools-router.js');
const BublsRouter = require('../ressources/bubls/bubls-router.js');
const rolesRouter = require('../ressources/roles/roles-router.js');
const hashtagsRouter = require('../ressources/hashtags/hashtags-router.js');
const restricted = require('../middlewares/restricted.js');

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
server.use('/api/bubls/', bublsPostRouter);
server.use('/api/posts', postsCommentRouter);
server.use('/api/comments/', commentsRouter);
server.use('/api/schools', schoolsRouter);
server.use('/api/bubls', BublsRouter);
server.use('/api/roles', rolesRouter);
server.use('/api/hashtags', hashtagsRouter, restricted);

server.get('/', async (req, res) => {
  try {
    res.status(200).json({Welcome_to: 'Bubl'});
  } catch (e) {
    console.log(e.message);
    res.status(500).json({errorMessage: 'Server error!'});
  }
});

module.exports = server;
