const mysql = require('mysql');

// Connection configurations


const conn = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '1234',
    database: 'catalog'
});

/*
function executeSQLQuery(sqlQuery, res) {
    conn.query(sqlQuery, function (error, results) {
        conn.end();
        if(error){
            console.log("Error executing query. Message: %s", error.message);
            return res(error, null);
        }
        else{
            console.log("Query executed successfully!");
            return res(null, results);
        }
    });
}*/

module.exports = conn;