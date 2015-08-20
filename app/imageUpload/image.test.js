var expect = require('chai').expect;
var request = require('supertest');

var app = require('../../app/');

describe('Valid form', function (){
  it('respond with profile', function(done){
    request(app)
      .get('/image')
      .expect(200)
      .end(function (err, res) {
        if (err) throw err;
        // console.log(res)
        expect(res.text).to.contain("multipart/form-data");
        done();
      });
  });
});

// describe('Image validation', function() {
//   it('file is <= 100000', function () {
//     expect(req.file.size).to.be.below(100000);
//   });
//   it('errors if file size > 100000'){
//     expect(res.err).to.equal('Image is larger than 10MB. Make the image smaller and then try uploading again.')
//   }
// });
