'use strict';
const express = require('express');
const router = express.Router({mergeParams: true});
const auth = require('./../../lib/middleware/auth');
const authController = require('./../../controllers/auth/auth.controller.js');

// ::V1 endpoint: POST /api/user/login
router.post('/user/login', auth.extractIP, (req, res, next) => {
  authController.login(req.body.userName, req.body.password, req.ip)
    .then((result) => res.set('x-access-token', result.token).json(result.user))
    .catch(next);
});

// ::V1 endpoint PATCH /api/user/logout
router.patch('/user/logout', auth.authenticateJWT, (req, res, next) => {
  authController.logout(req.userId)
    .then((result) => res.status(200).end())
    .catch(next);
});

module.exports = router;
