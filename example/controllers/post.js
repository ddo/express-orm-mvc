module.exports = {
    home: function (req, res, next) {
        res.send('home page');
    },
    get: function (req, res, next) {
        req.models.post.find(function(err, data) {
            if(err) return next(err);

            if(data.length === 0) {
                res.send(false);
                return;
            }

            res.send(data[0]);
        });
    },
    create: function (req, res, next) {
        req.models.post.create({
            title: 'title',
            content: 'content'
        }, function(err, result) {
            if(err) return next(err);
            res.send(result);
        });
    }
};