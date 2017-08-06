'use strict';
const express = require('express');
const router = express.Router({mergeParams: true});
const auth = require('./../../lib/middleware/auth');
const authController = require('./../../controllers/auth/auth.controller.js');

// ::V1 endpoint: GET /api/auth/login
router.post('/auth/login', auth.extractIP, (req, res, next) => {
  authController.attemptLogin(req.body.userName, req.body.password, req.ip)
    .then((result) => res.status(200).json(result))
    .catch(next);
});

module.exports = router;
