var assert = require('assert');
var business = require("../JS/business.js")
var server = require("../server.js")

  describe('#add()', function() {
    it('should return tha value of 4', function() {
      assert.equal(business.add(2,3), 5);
    });
  });
