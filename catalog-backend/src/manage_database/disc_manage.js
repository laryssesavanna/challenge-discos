const conn = require('../config/connection');

//
// Here are the functions to perform database operations
//


// Return a list of all discs from database
exports.selectAllDiscs = (res) => {
    conn.query('SELECT title, artist_name, genre, year FROM disc', res);
}

// Return one disc
exports.findDisc = (idDisc, res) => {
    conn.query('SELECT title, artist_name, genre, year FROM disc WHERE idDisc = ?', [idDisc], res);
}

// Insert a new disc in database
exports.insertDisc = (disc, res) => {
    conn.query('INSERT INTO disc (title, artist_name, genre, year, createdAt) VALUES (?, ?, ?, ?, ?)'
    , [disc.title, disc.artist_name, disc.genre, disc.year, new Date()], res);
}

