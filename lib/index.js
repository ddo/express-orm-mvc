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

module.exports = function(opt, callback) {
    if(arguments.length === 1) {
        callback = opt;
        opt = {};
    }

    var setting, mode, path;

    path = opt.path || helper.remoteDirname();

    //load config files
    var settings     = require(path + '/config/settings');
    var hook_routes  = require(path + '/config/routes');
    var hook_express = require(path + '/config/express');
    var hook_orm     = require(path + '/config/orm');

    //load setting
    mode = opt.mode || process.env.NODE_ENV || 'production';
    if(!settings[mode]) {
        return callback("Invalid Setting");
    }

    setting = settings[mode];

    //orm config
    model(app, {
        setting: setting.db,    //orm setting
        hook: hook_orm,         //orm config hook
        path: path + '/models'  //path to models folder
    }, function(err, database) {
        if(err) {
            console.log('Fail to load models');
            return callback(err);
        }

        //express config hook
        hook_express(app, express);

        //routes
        controller(path + '/controllers', function(err, controllers) {
            if(err) {
                console.log('Fail to load controllers');
                return callback(err);
            }
            
            hook_routes(app, controllers);
        });

        //create http server
        http.createServer(app).listen(setting.port, function(){
            console.log('Server is running');
            console.log('Mode: %s', mode);
            console.log('Port: %s', setting.port);

            callback(null, app, database);
        }).on('error', function(err) {
            if(err.code == 'EADDRINUSE') {
                console.log('Address in use. Is the server already running?');
            }

            callback(err);
        });
    });
};