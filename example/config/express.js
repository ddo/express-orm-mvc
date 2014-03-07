module.exports = function(app, express) {
    // all environments
    app.configure(function(){
        //get post params
        //req.body
        app.use(express.json());
        app.use(express.urlencoded());
    });

    //development only
    app.configure('development', function(){
        app.use(express.logger('dev'));
        app.use(express.errorHandler());
    });

    //production only
    app.configure('production', function(){

    });
};