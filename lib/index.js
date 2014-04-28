//Module dependencies.
var express = require('express');
var orm     = require('orm');
var http    = require('http');

//Load Model, Controller core
var helper     = require('./_helper');
var model      = require('./model');
var controller = require('./controller');

module.exports = function(opt, callback) {
    if(arguments.length === 1) {
        callback = opt;
        opt = {};
    }

    var app, setting, mode, path, server;

    //default
    express = opt.express   || express;
    orm     = opt.orm       || orm;
    path    = opt.path      || helper.remoteDirname();
    mode    = opt.mode      || process.env.NODE_ENV || 'production';
    
    app = express();

    //load config files
    var settings     = require(path + '/config/settings');
    var hook_routes  = require(path + '/config/routes');
    var hook_express = require(path + '/config/express');
    var hook_orm     = require(path + '/config/orm');

    //load setting
    if(!settings[mode]) {
        return callback("Invalid Setting");
    }

    setting = settings[mode];

    //append settings & mode
    app.use(function(req, res, next) {
        req.settings = setting;
        req.mode     = mode;
        return next();
    });

    //orm config
    model(app, {
        setting: setting,       //orm setting
        hook: hook_orm,         //orm config hook
        path: path + '/models', //path to models folder
        orm: orm,
        mode: mode
    }, function(err, database) {
        if(err) {
            console.log('Fail to load models');
            return callback(err);
        }

        //express config hook
        hook_express(app, express, {
            mode: mode,
            settings: setting
        });

        //routes
        controller(path + '/controllers', function(err, controllers) {
            if(err) {
                console.log('Fail to load controllers');
                return callback(err);
            }
            
            hook_routes(app, controllers, {
                mode: mode,
                settings: setting
            });
        });

        //create http server
        server = http.createServer(app).listen(setting.port, function(){
            callback(null, {
                server:     server,
                orm:        orm,
                database:   database,
                express:    express,
                app:        app,
                settings:    setting,
                mode:       mode
            });
        });
    });
};