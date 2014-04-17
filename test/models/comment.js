module.exports = function (orm, db) {
    var Comment = db.define('comment', {
        data: { type: 'text' }
    });
    Comment.hasOne("post", db.models.post);
};