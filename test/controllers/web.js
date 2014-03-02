module.exports = {
    home: function (req, res, next) {
        // res.sendfile(setting.path + '/public/index.html');
        res.send('home');
    }
};