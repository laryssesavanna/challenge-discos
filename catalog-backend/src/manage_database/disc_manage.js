const conn = require('../config/connection');

//
// Here are the functions to perform database operations
//


// Return a list of all discs from database
exports.selectAllDiscs = (res) => {
    conn.query('SELECT idDisc, title, artist_name, genre, year FROM disc', res);
}

// Return one disc
exports.findDisc = (idDisc, res) => {
    conn.query('SELECT idDisc, title, artist_name, genre, year FROM disc WHERE idDisc = ?', [idDisc], res);
}

// Insert a new disc in database
exports.insertDisc = (disc, res) => {
    conn.query('INSERT INTO disc (title, artist_name, genre, year, createdAt) VALUES (?, ?, ?, ?, ?)'
    , [disc.title, disc.artist_name, disc.genre, disc.year, new Date()], res);
}

// Update a disc with id = idDisc
exports.updateDisc = (disc, res) => {
    conn.query('UPDATE disc SET title = ?, artist_name = ?, genre = ?, year = ?, modifiedAt = ? WHERE idDisc = ?', 
    [disc.title, disc.artist_name, disc.genre, disc.year, new Date(), disc.idDisc], res);
}

// Delete disc
// OBS: I'm using DELETE CASCADE clause in database.
// So when I delete the disc, the relationship will be deleted automatically
exports.deleteDisc = (idDisc, res) => {
    conn.query('DELETE FROM disc WHERE idDisc = ?', [idDisc], res);
}