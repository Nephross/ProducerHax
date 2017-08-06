'use strict';

const express = require('express');
const router = express.Router();

/* The api router */
const authRouter = require('./auth/auth');
const userRouter = require('./users/users');
// Endpoint: /api/v2/press/
router.use('/auth', authRouter);
// Endpoint: /api/v2/util/
router.use('/users', userRouter);

module.exports = router;
