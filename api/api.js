'use strict';

const express = require('express');
const router = express.Router();

/* The api router */
router.get('/blogposts', function(req, res, next) {
  res.send('Blogposts');
});

module.exports = router;
