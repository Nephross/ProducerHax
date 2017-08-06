'use strict';
const express = require('express');
const router = express.Router({mergeParams: true});
const auth = require('./../../lib/middleware/auth');
const authController = require('./../../controllers/auth/auth.controller.js');

// ::V1 endpoint: POST /api/auth/login
router.post('/auth/login', auth.extractIP, (req, res, next) => {
  authController.attemptLogin(req.body.userName, req.body.password, req.ip)
    .then((result) => res.status(200).json(result.user))
    .catch(next);
});

// ::V1 endpoint PATCH /api/auth/logout
router.patch('/auth/logout', auth.authenticateJWT, (req, res, next) => {
  authController.logout(req.userId)
    .then((result) => res.status(200).end())
    .catch(next);
});

module.exports = router;
