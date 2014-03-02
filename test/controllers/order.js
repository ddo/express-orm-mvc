module.exports = {
    set: function (req, res, next) {
        res.send('set');
    },
    get: function (req, res, next) {
        res.send('get');
    }
};