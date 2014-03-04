module.exports = function (orm, db) {
    var Model1 = db.define('model1', {
        prop1: { type: 'text' },
        prop2: { type: 'text' }
    });

    Model1.hasOne("model2", db.models.model2);
};