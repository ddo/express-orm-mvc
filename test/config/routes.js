module.exports = function(app, controllers) {
    app.get(    '/'         , controllers.model1.home);
    app.get(    '/model2'   , controllers.model2.get);
    app.post(   '/model2'   , controllers.model2.create);
};