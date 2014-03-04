module.exports = function (orm, db) {
    db.define('product', {
        name: { type: 'text', required: true, unique: true }
    });
};