var orm     = require('orm-2.1.3');
var expect  = require('chai').expect;
var request = require('request');

describe("Options Testing", function() {
    var _err, _mvc;

    before(function(done) {
        //start server
        require('../index')({
            orm: orm
        }, function(err, mvc) {
            _err = err;
            _mvc = mvc;

            done();
        });
    });

    after(function(done) {
        //drop all tables
        _mvc.database.drop(function() {
            //shut down server
            _mvc.server.close(function() {
                done();
            });
        });
    });

    describe("app start", function() {
        it("error should be null", function(done) {
            expect(_err).to.be.a('null');
            expect(_mvc).to.have.property('server');
            expect(_mvc).to.have.property('orm');
            expect(_mvc).to.have.property('database');
            expect(_mvc).to.have.property('express');
            expect(_mvc).to.have.property('app');
            expect(_mvc).to.have.property('settings');
            expect(_mvc).to.have.property('mode');

            done();
        });
    });

    describe("expess config", function() {
        it("expess set/get", function() {
            expect(_mvc.app.get('test')).to.equal('testing data');
        });
    });

    describe("orm config", function() {
        it("orm set/get", function() {
            expect(_mvc.database.settings.get('test')).to.equal('testing data');
        });
    });
});