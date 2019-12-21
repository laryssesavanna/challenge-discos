const conn = require('../config/connection');

//
// Here are the functions to perform database operations
//


// Return a list of all collections from database
exports.selectAllCollections = (res) => {
    conn.query('SELECT idCollection, name, description FROM collection', res);
}

// Return one collection
exports.findCollection = (idColl, res) => {
    conn.query('SELECT idCollection, name, description FROM collection WHERE idCollection = ?', [idColl], res);
}

// Insert a new collection in database
exports.saveCollection = (collection, res) => {
    conn.query('INSERT INTO collection (name, description, createdAt) VALUES (?, ?, ?)', [collection.name, collection.description, new Date()], res);
}

// Update a collection with id = idColl
exports.updateCollection = (collection, res) => {
    conn.query('UPDATE collection SET name = ?, description = ?, modifiedAt = ? WHERE idCollection = ?', 
    [collection.name, collection.description, new Date(), collection.idColl], res);
}

// Delete collection
// OBS: I'm using DELETE CASCADE clause in database.
// So when I delete the collection, the relationship will be deleted automatically
exports.deleteCollection = (idColl, res) => {
    conn.query('DELETE FROM collection WHERE idCollection = ?', [idColl], res);
}

// Insert a new disc in collection
exports.insertDiscInCollection = (idDisc, idColl, res) => {
    conn.query('INSERT INTO disc_collection VALUES (?, ?)', [idDisc, idColl], res);
}

// Delete disc from collection
exports.deleteDiscFromColl = (idDisc, idColl, res) => {
    conn.query('DELETE FROM disc_collection WHERE Disc_idDisc = ? AND Collection_idCollection = ?', 
    [idDisc, idColl], res);
}

// Select all discs from collection
exports.selectAllDiscsFromColl = (idColl, res) => {
    conn.query('SELECT idDisc, title, artist_name, genre, year FROM disc_collection dc, '+
    'disc d WHERE dc.Disc_idDisc = d.idDisc AND dc.Collection_idCollection = ?', [idColl], res);
}