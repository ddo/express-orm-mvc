module.exports = function (orm, db) {
    var Order = db.define('order', {
        //unique cause bug on sync
        data1:  { type: 'text' },
        data2:  { type: 'text' }
    });

    Order.hasOne("product", db.models.product);
};