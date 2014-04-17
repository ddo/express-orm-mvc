module.exports = {
    home: function (req, res, next) {
        res.send('home page');
    },
    get: function (req, res, next) {
        req.models.post.find({id: req.params.id}, function(err, data) {
            if(err) return next(err);

            if(!data.length) {
                res.send(false);
            }

            res.send(data[0]);
        });
    },
    getall: function (req, res, next) {
        req.models.post.find(function(err, data) {
            if(err) return next(err);

            res.send(data);
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