'use strict';
var expect = require('chai').expect;
var request = require('supertest');

var app = require('../../app/');
var mongo = require('../../lib/mongo');
var Post = require('../post/Post');

describe('IMAGE UPLOAD /post', function () {
  var post;

  before(mongo.connect);
  after(Post.dropCollection);

  it('should create a post with an image', function (done) {
    Post.findAll(function (err, posts) {
      if (err) throw err;
      expect(posts).to.deep.equal([]);

      request(app)
        .post('/post')
        .attach('image', 'app/imageUpload/fixtures/cat.jpg')
        .expect(302)
        .expect('Moved Temporarily. Redirecting to /')
        .end(function (err) {
          if (err) throw err;
          Post.findAll(function (err, posts) {
            if (err) throw err;
            post = posts[0];
            expect(posts.length).to.equal(1);
            expect(post.url).to.exist;
            done();
          });
        });
    });
  });

  it('should create a post with an image', function (done) {
    request(app)
      .get(`/post/${post._id}`)
      .expect(200)
      .end(function (err, res) {
        if (err) throw err;
        expect(res.text).to.contain(`<img src="${post.url}" class="post">`);
        done();
      });
  });

});
