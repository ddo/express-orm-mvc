[Express](https://github.com/visionmedia/express) + [ORM](https://github.com/dresende/node-orm2) MVC
===============
As everyone the 1st time I start to use express, there was many problem i have to solve as

* Database
* App structure
* Router
* Separate modules
* ...

So hope this library help someone like me.

Any ideas are appreciated.

![codeship](https://www.codeship.io/projects/db0d6920-87f7-0131-c865-5eebdd5ccdbf/status)

##Features

* MVC
* This library just help you to structure your code and scale up later
* No Express or ORM hack
* Config Express and ORM by yourself (Fully control)

##Installation

	npm install express-orm-mvc --save
	
And for sure some dependencies

	npm install express --save
	npm install orm --save
	
Database package

	npm install <your database package>
	
Refer to ORM document [Connecting to Database](https://github.com/dresende/node-orm2/wiki/Connecting-to-Database)
	
##App structure

	/
		models/						-- all of your models here
		controllers/				-- all of your controllers here
		views/
		config/
			express.js				-- your express config
			orm.js					-- your orm config
			routes.js				-- router
			settings.js				-- app settings (ip, port, database, ...)
		app.js						-- root
		
Please check [example](example) folder

##How to use

Please check [example](example) folder or follow these document

###Init

```js
require(express-orm-mvc)(function(err){
	if(err) {
		console.log(err);
		return;
	}
	console.log('done');
});
```

###Models

A model file should be like this

```js
module.exports = function (orm, db) {
    //define your orm model here
};	
```

Example:

	models/post.js
	
```js
module.exports = function (orm, db) {
	var Post = db.define('post', {
		title:      { type: 'text' },
		content:    { type: 'text' }
    });
};
```

Check ORM document [Defining Models](https://github.com/dresende/node-orm2/wiki/Defining-Models)

###Controllers

A controller file should be like this

```js
module.exports = {
    //define your controller here
};
```

Example:

	controllers/post.js
	
```js
module.exports = {
	home: function(req, res, next){
		res.send('home page');
	},
    get: function(req, res, next) {
        req.models.post.find(function(err, data) {
            res.send(data);
        });
    },
    create: function(req, res, next) {
        req.models.post.create({
            title: 'title',
            content: 'content'
        }, function(err, result) {
            res.send(result);
        });
    }
};
```
**Note:** you can list all of your models in req.models

###Settings

	config/settings.js
	
A settings file should be like this

```js
module.exports = {
    mode1: { //development
        ip: <ip>,
        port: <port>,
        db: // orm database setting object
    },
    mode2: { //production
        ip: <ip>,
        port: <port>,
        db: // orm database setting object
    }
};
```

Example:

```js
module.exports = {
    development: {
        ip: '127.0.0.1',
        port: 8080,
        db: {
            host: '127.0.0.1',
            port: 3306,
            protocol: 'mysql',
            user: 'root',
            password: '123456789',
            database: 'express-orm-mvc-test',
            connectionLimit: 100
        }
    },
    production: {
        ip: '127.0.0.1',
        port: 8080,
        db: {
            host: '127.0.0.1',
            port: 3306,
            protocol: 'mysql',
            user: 'root',
            password: '123456789',
            database: 'express-orm-mvc-test',
            connectionLimit: 100
        }
    }
};
```

**Note**: You should set your NODE_ENV variable (development or production), or you can by pass by send directly the mode option when init, check [here](#init-with-options)

Check ORM document [Connecting to Database](https://github.com/dresende/node-orm2/wiki/Connecting-to-Database)

###Express config
	
	config/express.js
	
A express config file should be like this

```js
module.exports = function(app, express) {
    //any express config here
};
```

Example:

```js
module.exports = function(app, express) {
    app.set('title', 'testing');    	
    app.set('views', '../views');
	app.set('view engine', 'ejs');
    app.use(express.favicon());
};
```

Check Express document [api](http://expressjs.com/api.html)

**Note**:

* As you see there is no ```views``` folder in app structure, so create and manage by yourself
* Library will start a server automatically, so no need this kind of this stuff

```js
http.createServer(app).listen(function(){});
```

###ORM config

	config/orm.js
	
A orm config file should be like this

```js
module.exports = function(orm, db) {
    //any orm config here
};
```

Example:

```js
module.exports = function(orm, db) {
    db.settings.set('test', 'testing data');
};
```

Check ORM document [Settings](https://github.com/dresende/node-orm2/wiki/Settings)

**Note**: Library will [sync database](https://github.com/dresende/node-orm2/wiki/Synching-and-Dropping-Models#wiki-synching) automatically.

###Routes config

	config/routes.js
	
A routes config file should be like this

```js
module.exports = function(app, controllers) {
	//routes here
};
```

Example:

```js
module.exports = function(app, controllers) {
    app.get(    '/'       , controllers.post.home);
    app.get(    '/post'   , controllers.post.get);
    app.post(   '/post'   , controllers.post.create);
};
```

##Init with options

```js
require(express-orm-mvc)({
	mode: 'development'	//default: production
	path: __dirname		//default: auto detect, if there is any problem pls set path = __dirname
}, callback);
```

##Todo

* Express 4 testing

===
[![Bitdeli Badge](https://d2weczhvl823v0.cloudfront.net/ddo/express-orm-mvc/trend.png)](https://bitdeli.com/free "Bitdeli Badge")