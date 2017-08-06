'use strict';
const express = require('express');
const router = express.Router({mergeParams: true});
const auth = require('./../../lib/middleware/auth');
const multer = require('./../../lib/middleware/multer');
const podcastController = require('./../../controllers/users/podcast.controller.js');

// ::V1 endpoint: POST /api/podcast/
router.post('/podcast', multer.single('profile_picture'), (req, res, next) => {
  podcastController.createPodcast(req.body)
    .then((podcast) => res.json(podcast))
    .catch(next);
});

// ::V1 endpoint: GET /api/podcast/
router.get('/podcast', auth.authenticateJWT, (req, res, next) => {
  podcastController.getPodcasts()
    .then((podcasts) => res.json(podcasts))
    .catch(next);
});

// ::V1 endpoint: GET /api/podcast/:podcastId
router.get('/podcast/:podcastId', auth.authenticateJWT, (req, res, next) => {
  podcastController.getPodcast(req.params.podcastId)
    .then((podcast) => res.json(podcast))
    .catch(next);
});

// ::V1 endpoint: PUT /api/podcast/:podcastId
router.put('/podcast/:podcastId', auth.authenticateJWT, multer.single('profile_picture'), (req, res, next) => {
  podcastController.updatePodcast(req.params.podcastId, req.body)
    .then((podcast) => res.json(podcast))
    .catch(next);
});

module.exports = router;
