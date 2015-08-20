'use strict';

var express = require('express');
var router = express.Router();

var home = require('./home/routes');
var image = require('./imageUpload/routes');

router.use('/', home);
router.use('/image', image);

module.exports = router;
