var body_parser   = require('body-parser');
var logger        = require('morgan');
var error_handler = require('errorhandler');

module.exports = function(app, express) {
    app.set('test', 'testing data');
    app.use(body_parser());
    app.use(logger('dev'));
    app.use(error_handler());
};