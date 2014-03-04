module.exports = {
    get: function (req, res, next) {
        req.models.model2.find(function(err, data) {
            if(err) return next(err);

            if(data.length === 0) {
                res.send(false);
                return;
            }

            res.send(data[0]);
        });
    },
    create: function (req, res, next) {
        req.models.model2.create({
            prop1: 'testing',
            prop2: 'data'
        }, function(err, result) {
            if(err) return next(err);
            res.send(result);
        });
    }
};