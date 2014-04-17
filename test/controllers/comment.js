module.exports = {
    get: function (req, res, next) {
        req.models.comment.find({id: req.params.id}, function(err, data) {
            if(err) return next(err);

            if(!data.length) {
                res.send(false);
            }

            res.send(data[0]);
        });
    },
    getall: function (req, res, next) {
        req.models.comment.find(function(err, data) {
            if(err) return next(err);

            res.send(data);
        });
    },
    create: function (req, res, next) {
        req.models.comment.create({
            data: 'comment data',
            post_id: 1
        }, function(err, result) {
            if(err) return next(err);
            res.send(result);
        });
    }
};