var mvc = require('express-orm-mvc');
mvc({
    path: __dirname
}, function(err, app, db) {
    if(err)
        console.log(err);
});