'use strict';
const express = require('express');
const router = express.Router({mergeParams: true});
const auth = require('./../../lib/middleware/auth');
const multer = require('./../../lib/middleware/multer');
const blogController = require('./../../controllers/blog/blog.controller.js');

// ::V1 endpoint: POST /api/blog/
router.post('/blog', multer.single('profile_picture'), (req, res, next) => {
  blogController.createBlog(req.body)
    .then((blog) => res.json(blog))
    .catch(next);
});

// ::V1 endpoint: GET /api/blog
router.get('/blog', auth.authenticateJWT, (req, res, next) => {
  blogController.getBlogs()
    .then((blogs) => res.json(blogs))
    .catch(next);
});

// ::V1 endpoint: GET /api/blog/:blogId
router.get('/blog/:blogId', auth.authenticateJWT, (req, res, next) => {
  blogController.getBlog(req.params.blogId)
    .then((blog) => res.json(blog))
    .catch(next);
});

// ::V1 endpoint: PUT /api/blog
router.put('/blog/:blogId', auth.authenticateJWT, multer.single('profile_picture'), (req, res, next) => {
  blogController.updateBlog(req.params.blogId, req.body)
    .then((blog) => res.json(blog))
    .catch(next);
});

module.exports = router;
