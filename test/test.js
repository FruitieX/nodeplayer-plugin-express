'use strict';

/*jshint expr: true*/
var should = require('chai').should();
var _ = require('underscore');
var plugin = require('../');

process.env.NODE_ENV = 'test';

describe('plugin module', function() {
    it('should export a init function', function() {
        plugin.init.should.be.ok.and.should.be.a.Function;
    });
});
