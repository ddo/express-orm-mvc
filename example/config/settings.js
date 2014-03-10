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
            database: 'test',
            connectionLimit: 100
        }
    },
    production: {
        ip: '127.0.0.1',
        port: 8000,
        db: {
            host: '127.0.0.1',
            port: 3306,
            protocol: 'mysql',
            user: 'user',
            password: 'password',
            database: 'production',
            connectionLimit: 100
        }
    }
};