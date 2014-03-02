module.exports = function(app, controllers) {
    app.get( '/'    , controllers.web.home);
    app.get( '/get' , controllers.order.get);
    app.get( '/set' , controllers.order.set);
};