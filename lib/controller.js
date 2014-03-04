var path        = require('path');
var helper      = require('./_helper');
var controllers = {};

module.exports = function(controller_path, callback) {
    helper.listJSFiles(controller_path, function(err, files) {
        if(err) return callback(err);

        for(var i = 0; i < files.length; i++) {
            var controller = path.basename(files[i], '.js');
            controllers[controller] = require(files[i]);
        }

        callback(null, controllers);
    });
};