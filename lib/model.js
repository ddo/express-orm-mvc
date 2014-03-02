var orm      = require('orm');
var database = null;

//TODO: auto load models
var models = [
    'order',
    'product'
];

module.exports = function(db_setting, config, callback) {
    if(database) return callback(null, database);

    orm.connect(db_setting, function(err, db) {
        if(err) return callback(err);

        //orm config
        config(orm, db);
            
        //TODO: auto load models
        //load all models in folders
        for(var i = 0; i < models.length; i++) {
            require('../test/models/' + models[i])(orm, db);
        }

        //sync database table
        db.sync(function(err) {
            if(err) return callback(err);

            //cache
            database = db;

            callback(null, database);
        });
    });
};