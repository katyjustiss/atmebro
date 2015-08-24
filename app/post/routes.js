'use strict';

var express = require('express');
var router = express.Router();
var multer = require('multer');

var ctrl = require('./controller');
var imageUploadImgurCtrl = require('../imageUpload/imageController');

var upload = multer({
  dest: 'uploads/',
  limits: {
    fileSize: 10000000 //20MB
  },
  fileFilter: function (req, file, cb) {
    cb(null, file.mimetype.slice(0,6) === 'image/');
  }
});

router.get('/', ctrl.index);
router.post('/post', upload.single('image'), imageUploadImgurCtrl.img, ctrl.create);
router.get('/post/:id', ctrl.show);

module.exports = router;
