'use strict';

var express = require('express');
var router = express.Router();

var ctrl = require('./controller');
var imageUploadImgur = require('../imageUpload/imageController');

router.get('/', ctrl.index);
router.post('/post', imageUploadImgur.img, ctrl.create);
router.get('/post/:id', ctrl.show);

module.exports = router;
