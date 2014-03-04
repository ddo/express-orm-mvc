var expect  = require('chai').expect;
var request = require('request');

describe("express-orm-mvc Test", function() {
    var mvc = require('../index');
    var app, database;

    describe("app start", function() {
        it("error should be null", function(done) {
            mvc({
                path: __dirname,
                mode: 'development'
            }, function(err, express_instance, db) {
                app      = express_instance;
                database = db;

                expect(err).to.be.a('null');

                done();
            });
        });
    });

    describe("expess config", function() {
        it("expess set/get", function() {
            expect(app.get('test')).to.equal('testing data');
        });
    });

    describe("orm config", function() {
        it("orm set/get", function() {
            expect(database.settings.get('test')).to.equal('testing data');
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
                expect(body).to.not.equal({
                    prop1: 'testing',
                    prop2: 'data'
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
                expect(body).to.not.equal({
                    prop1: 'testing',
                    prop2: 'data'
                });

                //cleaning
                //drop all table
                database.drop(function() {
                    done();
                });
            });
        });
    });
});