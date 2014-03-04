/**
 * Module dependencies.
 */
var express = require('express');
var http    = require('http');
var app     = express();

/*
    Load Model, Controller core
*/
var helper     = require('./_helper');
var model      = require('./model');
var controller = require('./controller');

module.exports = function(mode, callback) {
    /*
        Load config files
    */
    var settings = require(helper.getCallerPath('config/settings'));
    
    var hook_routes   = require(helper.getCallerPath('config/routes'));
    var hook_express  = require(helper.getCallerPath('config/express'));
    var hook_orm      = require(helper.getCallerPath('config/orm'));

    var setting;

    if(arguments.length === 1) {
        callback = mode;
        mode = null;
    }

    //load setting
    mode = mode || process.env.NODE_ENV || 'production';
    if(!settings[mode]) {
        return callback("Invalid Setting");
    }

    setting = settings[mode];

    //orm config
    model(app, {
        setting: setting.db, //orm setting
        hook: hook_orm,  //orm config hook
        path: helper.getCallerPath('models') //path to models folder
    }, function(err, database) {
        if(err) {
            console.log('Fail to load models');
            return callback(err);
        }
    });

    //express config hook
    hook_express(app);

    //routes
    controller(helper.getCallerPath('controllers'), function(err, controllers) {
        if(err) return callback(err);
        
        hook_routes(app, controllers);
    });

    //create http server
    http.createServer(app).listen(setting.port, function(){
        console.log('Server is running');
        console.log('Mode: %s', mode);
        console.log('Port: %s', setting.port);

        callback(null);
    }).on('error', function(e) {
        if(e.code == 'EADDRINUSE') {
            console.log('Address in use. Is the server already running?');
        }

        callback(e);
    });
};