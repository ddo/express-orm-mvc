var path     = require('path');
var orm      = require('orm');
var helper   = require('./_helper');
var database = null;

module.exports = function(opt, callback) {
    if(database) return callback(null, database);

    orm.connect(opt.setting, function(err, db) {
        if(err) return callback(err);

        //orm config hook
        opt.hook(orm, db);
            
        //load all models in folders
        helper.listJSFiles(opt.path, function(err, files) {
            if(err) return callback(err);

            for(var i = 0; i < files.length; i++) {
                require(files[i])(orm, db);
            }

            //sync database table
            db.sync(function(err) {
                if(err) return callback(err);

                //cache
                database = db;

                callback(null, database);
            });
        });
    });
};