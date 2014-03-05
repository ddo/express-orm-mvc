module.exports = function(app, controllers) {
    app.get(    '/'       , controllers.post.home);
    app.get(    '/post'   , controllers.post.get);
    app.post(   '/post'   , controllers.post.create);
};