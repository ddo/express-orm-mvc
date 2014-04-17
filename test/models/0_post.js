//note: the file name is 0_post.js
//because i want to load this file before comment
//since comment hasOne post

module.exports = function (orm, db) {
    db.define('post', {
        title:      { type: 'text' },
        content:    { type: 'text' }
    });
};