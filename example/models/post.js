module.exports = function (orm, db) {
    db.define('post', {
        title:      { type: 'text' },
        content:    { type: 'text' }
    });
};