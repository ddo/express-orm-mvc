var expect  = require('chai').expect;
var request = require('request');

describe("Default Testing", function() {
    var _err, _mvc;

    before(function(done) {
        //start server
        require('../index')(function(err, mvc) {
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
            expect(_mvc).to.have.property('setting');
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

    describe("express routes", function() {
        it("get static", function(done) {
            request({
                url: 'http://localhost:8080',
                method: 'GET'
            }, function(err, res, body) {
                expect(body).to.equal('testing ok');
                done();
            });
        });

        it("get empty", function(done) {
            request({
                url: 'http://localhost:8080/model2',
                method: 'GET',
                json: true
            }, function(err, res, body) {
                expect(body).to.be.false;
                done();
            });
        });

        it("create", function(done) {
            request({
                url: 'http://localhost:8080/model2',
                method: 'POST',
                json: true
            }, function(err, res, body) {
                expect(body).to.be.an('object');
                expect(body).to.be.eql({
                    prop1: 'testing',
                    prop2: 'data',
                    id: 1
                });

                done();
            });
        });

        it("get", function(done) {
            request({
                url: 'http://localhost:8080/model2',
                method: 'GET',
                json: true
            }, function(err, res, body) {
                expect(body).to.be.an('object');
                expect(body).to.be.eql({
                    prop1: 'testing',
                    prop2: 'data',
                    id: 1
                });

                done();
            });
        });
    });
});