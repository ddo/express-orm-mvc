var path     = require('path');
var helper   = require('./_helper');

module.exports = function(app, opt, callback) {
    var orm = opt.orm;

    orm.connect(opt.setting.db, function(err, db) {
        if(err) return callback(err);

        //orm config hook
        opt.hook(orm, db, {
            mode: opt.mode,
            settings: opt.setting
        });
            
        //load all models in folders
        helper.listJSFiles(opt.path, function(err, files) {
            if(err) return callback(err);

            for(var i = 0; i < files.length; i++) {
                require(files[i])(orm, db);
            }

            //load models
            app.use(function(req, res, next) {
                req.db = db;
                req.models = db.models;
                return next();
            });

            //sync database table
            db.sync(function(err) {
                if(err) return callback(err);

                callback(null, db);
            });
        });
    });
};