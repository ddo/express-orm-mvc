require('express-orm-mvc')(function(error, mvc) {
    if(error)
        return console.log(error);

    console.log('Server is running');
    console.log('Mode: %s', mvc.mode);
    console.log('Port: %s', mvc.settings.port);
});