const conn = require('../config/connection');

//
// Here are the functions to perform database operations
//


// Return a list of all collections from database
exports.selectAllCollections = (res) => {
    conn.query('SELECT name, description FROM collection', res);
}

// Return one collection
exports.findCollection = (idColl, res) => {
    conn.query('SELECT name, description FROM collection WHERE idCollection = ?', [idColl], res);
}

// Insert a new collection in database
exports.insertCollection = (collection, res) => {
    conn.query('INSERT INTO collection (name, description, createdAt) VALUES (?, ?, ?)'
    , [collection.name, collection.description, new Date()], res);
}

