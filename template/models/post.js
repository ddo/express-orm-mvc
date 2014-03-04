module.exports = function (orm, db) {
    var Post = db.define('post', {
        title:      { type: 'text' },
        content:    { type: 'text' }
    });

    Post.hasOne("comment", db.models.comment);
};