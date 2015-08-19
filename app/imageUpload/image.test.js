var expect = require('chai').expect;
var request = require('supertest');

var app = require('../../app/');

describe('Tests', function() {
  it('truthyness', function () {
    expect(true).to.equal(true);
  });
});
