'use strict';

var fs = require('fs');
var imgur = require('imgur');
var multer = require('multer');

var upload = multer({
  dest: 'uploads/',
  limits: {
    fileSize: 10000000 //20MB
  },
  fileFilter: function (req, file, cb) {
    cb(null, file.mimetype.slice(0,6) === 'image/');
  }
});

var uploadMulter = upload.single('image')

module.exports.img = function (req, res, next) {
  uploadMulter(req, res, function (err) {
    console.log(req.body)
    if (err) {
      console.log(err)
    } else if(!req.file) {
      next();
    }
    imgurUpload(req, function (err, result) {
      req.imgur = result;
      next();
    });
  })
};

function imgurUpload(req, cb) {
  if (req.file) {
    imgur
      .uploadFile(req.file.path)
      .then(function (result) {

        fs.unlink(req.file.path, function (err) {
          if (err) throw err;
          cb(err, result);
        });
      })
      .catch(cb);
  }
}
