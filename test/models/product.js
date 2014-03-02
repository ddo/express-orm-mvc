module.exports = function (orm, db) {
    db.define('product', {
        //unique cause bug on sync
        name: { type: 'text', required: true, unique: true }
    });
};