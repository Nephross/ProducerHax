'use strict';

const express = require('express');
const router = express.Router();

/* The api router */
const authRouter = require('./auth/auth');
const userRouter = require('./users/users');
// Endpoint: /api/auth/
router.use('/auth', authRouter);
// Endpoint: /api/users/
router.use('/users', userRouter);

module.exports = router;
