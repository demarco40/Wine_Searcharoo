var assert = require('assert');
var chai = require('chai');
var chaiHttp = require('chai-http');
var business = require("../JS/business.js");
var server = require("../server.js");
var data = require("../JS/data.js");
var should = chai.should();
chai.use(chaiHttp);

describe('Server Tests', function() {
  it('Should Return the index page', function(done){
    chai.request('http://localhost:3000')
    .get('/')
    done();
  });

  it('Should Return the Favorites partial', function(done){
    chai.request('http://localhost:3000/favorites')
    .get('/views/partials/favorites')
    done();
  });

  it('Should Return the Dialog partial', function(done){
    chai.request('http://localhost:3000/dialog')
    .get('/views/partials/dialog')
    done();
  });

  it('Should Return the Wishlist partial', function(done){
    chai.request('http://localhost:3000/wishlist')
    .get('/views/partials/wishlist')
    done();
  });

  it('Should Return the Custom partial', function(done){
    chai.request('http://localhost:3000/custom')
    .get('/views/partials/custom')
    done();
  });

  it('Should Return the Head partial', function(done){
    chai.request('http://localhost:3000/Head')
    .get('/views/partials/head')
    done();
  });

  it('Should Return the Search partial', function(done){
    chai.request('http://localhost:3000/Search')
    .get('/views/partials/search')
    done();
  });

});

