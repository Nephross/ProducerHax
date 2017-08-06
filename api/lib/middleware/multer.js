'use strict';

const multer = require('multer');
const pathForUploadPic = './../../../app/public/images/uploads';
const uuid = require('uuid/v4');

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, pathForUploadPic);
  },
  filename: function(req, file, cb) {
    cb(null, uuid());
  }
});
const uploadToLocal = multer({
  storage: storage
});

module.exports = {
  upload: uploadToLocal
};
