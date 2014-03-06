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
    test: {
        ip: '127.0.0.1',
        port: 8080,
        db: {
            host: '127.0.0.1',
            port: 3306,
            protocol: 'mysql',
            user: 'ubuntu',
            password: '',
            database: 'circle_test',
            connectionLimit: 100
        }
    }
};
