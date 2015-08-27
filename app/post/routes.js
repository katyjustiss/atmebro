'use strict';

var express = require('express');
var router = express.Router();

var ctrl = require('./controller');
var imageUploadToImgur = require('../imageUpload/imageController');

router.get('/', ctrl.index);
router.post('/post', imageUploadToImgur, ctrl.create);
router.get('/post/:id', ctrl.show);

module.exports = router;
