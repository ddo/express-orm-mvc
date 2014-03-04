module.exports = function (orm, db) {
    db.define('comment', {
        data: { type: 'text' }
    });
};