'use strict';

var fs = require('fs');
var imgur = require('imgur');
var multer = require('multer');

var tenMegaBytes = 1000000;

var upload = multer({
  dest: 'uploads/',
  limits: {
    fileSize: tenMegaBytes
  },
  fileFilter: function (req, file, cb) {
    cb(null, file.mimetype.slice(0,6) === 'image/');
  }
});

var uploadMulter = upload.single('image')

module.exports = function (req, res, next) {
  uploadMulter(req, res, function (err) {
    if (err) {
      throw err;
    } else if(!req.file) {
      next();
    }
    uploadToImgur(req, function (err, result) {
      req.imgur = result;
      next();
    });
  })
};

function uploadToImgur(req, cb) {
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
