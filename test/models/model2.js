module.exports = function (orm, db) {
    db.define('model2', {
        prop1: { type: 'text', required: true },
        prop2: { type: 'text' }
    });
};