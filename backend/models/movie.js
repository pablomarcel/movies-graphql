const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const movieSchema = new Schema({
    title: String,
    genre: String,
    directorId: String
});

// mongoose pluralizes Movie into movies
// Movie refers to the movies collection in the database

module.exports = mongoose.model('Movie', movieSchema);
