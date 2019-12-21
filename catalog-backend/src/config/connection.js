const mysql = require('mysql');

// Connection configurations

const conn = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '1234',
    database: 'catalog'
});

module.exports = conn;