/**
 * Module dependencies.
 */
var express = require('express');
var http    = require('http');
var app     = express();

/*
    Load Model, Controller core
*/
var model      = require('./model');
var controller = require('./controller');

/*
    Load config files
*/
var config_routes   = require('../test/config/routes');
var config_settings = require('../test/config/settings');
var config_express  = require('../test/config/express');
var config_orm      = require('../test/config/orm');

module.exports = function(mode, callback) {
    var setting;

    if(arguments.length === 1) {
        callback = mode;
        mode = null;
    }

    //load setting
    mode = mode || process.env.NODE_ENV || 'production';
    if(!config_settings[mode]) {
        return callback("Invalid Setting");
    }

    setting = config_settings[mode];

    //orm config
    //load models
    model(setting.db, config_orm, function(err, db) {
        if(err) return callback(err);

        app.use(function(req, res, next) {
            req.db = db;
            req.models = db.models;
            return next();
        });
    });

    //express config
    config_express(app);

    //routes
    config_routes(app, controller);

    //create http server
    http.createServer(app).listen(setting.port, function(){
        console.log('Server is running in %s mode', mode);
        callback(null);
    }).on('error', function(e) {
        if(e.code == 'EADDRINUSE') {
            console.log('Address in use. Is the server already running?');
        }
        if(callback) {
            return callback(e);
        }
    });
};