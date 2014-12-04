/* TEST FOR GLOBALS LIBRARIES/FRAMEWORKS THAT ARE REQUIRED */
var _ = require('lodash');
var Backbone = require('backbone');
var React = require('react');

var Globals = describe('Globals', function(){
  describe('#Check if libraries are included', function(){
    it('Backbone should exist and be an object', function(done){
      Backbone.should.be.instanceOf(Object);
      done();
    });
    it('Lodash should exist and should be a function', function(done){
      _.should.be.type('function');
      done();
    });
    it('React should exist and should be an object', function(done){
      React.should.be.instanceOf(Object);
      done();
    });
  });
});

module.exports = Globals;
