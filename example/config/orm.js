module.exports = function(orm, db) {
    db.settings.set("instance.cache", true);
    db.settings.set("instance.autoFetch", true);
    db.settings.set("instance.autoFetchLimit", 1);
    db.settings.set("instance.cascadeRemove", false);
    db.settings.set("connection.reconnect", true);
    db.settings.set("connection.pool", true);
    db.settings.set("connection.debug", true);
};