'use strict';

var fs = require('fs');
var imgur = require('imgur');
var multer = require('multer');

module.exports.img = function (req, res, next) {
  imgurUpload(req);
  next();
};

function imgurUpload(req) {
  req.body.file = req.file;
  if (req.body.file) {
    imgur
      .uploadFile(req.body.file.path)
      .then(function (json) {
        fs.unlink(req.body.file.path, function () {
          req.body.file.imgurUrl = json.data.link;
          console.log(req.body)
          return req.body
        });
      })
      .catch(function (err) {
        res.send(err);
      });
  }
}
