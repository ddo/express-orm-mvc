module.exports = {
    get: function (req, res, next) {
        req.models.comment.find({id: req.params.id}, function(err, data) {
            if(err) return next(err);

            res.send(data[0]);
        });
    }
};