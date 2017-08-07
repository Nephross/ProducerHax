'use strict';

var testCase = require('mocha').describe;
var assertion = require('mocha').it;
var assert = require('chai').assert;

testCase("Testing the tests", function() {
  assertion("Should pass", function(done) {
    assert.isTrue(true, "Some message");
    done();
  });
});

testCase("Testing the tests2", function() {
  assertion("Should pass2", function(done) {
    assert.isString("2", "It was not a string");
    done();
  });
});
