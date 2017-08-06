'use strict';
const express = require('express');
const router = express.Router({mergeParams: true});
const auth = require('./../../lib/middleware/auth');
const multer = require('./../../lib/middleware/multer');
const userController = require('./../../controllers/users/user.controller.js');

// ::V1 endpoint: POST /api/users/
router.post('/users', multer.single('profile_picture'), (req, res, next) => {
  userController.createUser(req.body)
    .then((user) => res.json(user))
    .catch(next);
});

// ::V1 endpoint: GET /api/users/:userId
router.get('/users/:userId', auth.authenticateJWT, multer.single('profile_picture'), (req, res, next) => {
  userController.getUser(req.params.userId)
    .then((user) => res.json(user))
    .catch(next);
});

// ::V1 endpoint: PUT /api/users
router.put('/users', auth.authenticateJWT, (req, res, next) => {
  userController.updateuser(req.body)
    .then((user) => res.json(user))
    .catch(next);
});

module.exports = router;
